import sys
import traceback
from PyQt5.QtCore import Qt, QTimer, QRunnable, pyqtSlot, QThreadPool, QObject, pyqtSignal
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QAction, QFileDialog
from PyQt5.QtGui import QIcon, QFont
# from pynput import keyboard, mouse
import easyocr
import cv2
import numpy as np


# 打包最后也没有成功。错误排查参考 https://www.programmersought.com/article/55733636740/
# pyqt 的问题解决了，但可能因为 easyocr, 打包出来有 1G 多，还有各样的错误。

class WorkerSignals(QObject):
    finished = pyqtSignal()
    error = pyqtSignal(tuple)
    result = pyqtSignal(object)


class Worker(QRunnable):
    def __init__(self, fn, *args, **kwargs):
        super(Worker, self).__init__()
        self.fn = fn
        self.args = args
        self.kwargs = kwargs
        self.signals = WorkerSignals()

    @pyqtSlot()
    def run(self):
        try:
            result = self.fn(*self.args, **self.kwargs)
        except:
            traceback.print_exc()
            exctype, value = sys.exc_info()[:2]
            self.signals.error.emit((exctype, value, traceback.format_exc()))
        else:
            self.signals.result.emit(result)  # Return the result of the processing
        finally:
            self.signals.finished.emit()  # Done


class MaDouOCR(QMainWindow):
    PRIMARY_TITLE = '麻豆 OCR'
    MSG_READY = 'Ready.'
    MSG_SELECT_ALL = '全选完毕'
    MSG_COPY_ALL = '复制完毕'
    MSG_PASTE = '粘贴完毕'
    MSG_OPEN_FILE_ERR = '未选中文件'
    MSG_PARSING = '正在解析图片...'
    MSG_OCR_ERR = 'OCR失败，请重试'
    CAP_OPEN_FILE = '打开图片'
    CAP_UPLOAD_ACT = '传入图片(offline)'
    CAP_SELECT_ALL_ACT = '全选'
    CAP_COPY_ACT = '复制'
    CAP_PASTE_ACT = '粘贴'
    DEFAULT_OPEN_FILE_DIR = 'd:\\desktop\\'
    FMT_OPEN_FILE = '图片文件 (*.jpg *.jpeg *.png *.jfif *.gif *.webp)'
    TIME_SHORT_STATUS = 1200
    TIME_REGULAR_STATUS = 2500
    TIME_LONG_STATUS = 4000

    @staticmethod
    def cv_imread(file_path):
        # https: // www.zhihu.com / question / 67157462 / answer / 251754530
        cv_img = cv2.imdecode(np.fromfile(file_path, dtype=np.uint8), -1)
        return cv_img

    def __init__(self):
        super().__init__()
        self.statusBar = self.statusBar()
        self.threadpool = QThreadPool()

        self.initUI()
        # self.initGlbKBoardListener()

    # def initGlbKBoardListener(self):
    #     listener = keyboard.Listener(on_press=MaDouOCR.on_press)
    #     listener.start()  # start to listen on a separate thread
    #     listener.join()

    # @staticmethod
    # def on_press(key):
    #     print('screenshot shortcut is listened!')
    #     print(key)

    def set_status_and_timeout(self, msg: str, timeout=0):
        self.statusBar.showMessage(msg)
        try:
            if timeout:
                assert isinstance(timeout, (int, float))
                QTimer().singleShot(timeout, lambda: self.statusBar.showMessage(MaDouOCR.MSG_READY))
        except Exception as e:
            print(e)

    def select_all(self):
        self.textEdit.selectAll()
        self.set_status_and_timeout(MaDouOCR.MSG_SELECT_ALL, MaDouOCR.TIME_REGULAR_STATUS)

    def copy_all(self):
        self.textEdit.selectAll()
        self.textEdit.copy()
        self.set_status_and_timeout(MaDouOCR.MSG_COPY_ALL, MaDouOCR.TIME_REGULAR_STATUS)

    def paste(self):
        self.textEdit.paste()
        self.set_status_and_timeout(MaDouOCR.MSG_PASTE, MaDouOCR.TIME_REGULAR_STATUS)

    def initStatusBar(self):
        self.set_status_and_timeout(MaDouOCR.MSG_READY)

    def initTextEdit(self):
        textEdit = QTextEdit()
        textEdit.setFont(QFont("Helvetica [Cronyx]", 12))
        self.textEdit = textEdit
        self.setCentralWidget(textEdit)

    def ocr(self, fp):
        img = MaDouOCR.cv_imread(fp)
        reader = easyocr.Reader(['ch_sim', 'en'], gpu=True)
        ocr_list_res = reader.readtext(img, detail=0)
        print(ocr_list_res)
        ocr_res = ''.join(ocr_list_res)
        return ocr_res


    def ocr_succeed(self, ocr_res):
        self.set_status_and_timeout('OCR成功了')
        self.textEdit.setText(ocr_res)

    def ocr_finished(self):
        pass

    def parse_image(self):
        fname = QFileDialog.getOpenFileName(self, MaDouOCR.CAP_OPEN_FILE, MaDouOCR.DEFAULT_OPEN_FILE_DIR,
                                            MaDouOCR.FMT_OPEN_FILE)
        print(fname)
        print(fname[0])

        if fname[0]:
            self.set_status_and_timeout(MaDouOCR.MSG_PARSING)
            worker = Worker(lambda: self.ocr(fname[0]))
            worker.signals.result.connect(self.ocr_succeed)
            worker.signals.finished.connect(self.ocr_finished)
            self.threadpool.start(worker)
        else:
            self.set_status_and_timeout(MaDouOCR.MSG_OPEN_FILE_ERR, 1500)

    def initToolBar(self):
        uploadAct = QAction(QIcon('upload.png'), MaDouOCR.CAP_UPLOAD_ACT, self)
        uploadAct.setShortcut('Alt+V')
        uploadAct.triggered.connect(self.parse_image)

        selectAllAct = QAction(QIcon('select_all.png'), MaDouOCR.CAP_SELECT_ALL_ACT, self)
        selectAllAct.setShortcut('Ctrl+A')
        selectAllAct.triggered.connect(self.select_all)

        copyAllAct = QAction(QIcon('copy.png'), MaDouOCR.CAP_COPY_ACT, self)
        copyAllAct.setShortcut('Ctrl+C')
        copyAllAct.triggered.connect(self.copy_all)

        pasteAllAct = QAction(QIcon('paste.png'), MaDouOCR.CAP_PASTE_ACT, self)
        pasteAllAct.setShortcut('Ctrl+V')
        pasteAllAct.triggered.connect(self.paste)

        toolbar = self.addToolBar('Text Operation')
        toolbar.addAction(uploadAct)
        toolbar.addAction(selectAllAct)
        toolbar.addAction(copyAllAct)
        toolbar.addAction(pasteAllAct)

    def keyPressEvent(self, e):
        if e.key() == Qt.Key_Escape:
            # self.hide()
            pass

    def initUI(self):
        self.initStatusBar()
        self.initTextEdit()
        self.initToolBar()

        self.setGeometry(300, 300, 550, 350)
        self.setWindowTitle(MaDouOCR.PRIMARY_TITLE)
        self.setWindowIcon(QIcon('p.ico'))

        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    pyqtApp = MaDouOCR()
    sys.exit(app.exec_())
