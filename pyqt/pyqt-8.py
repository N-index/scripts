import sys
from PyQt5.QtWidgets import QMainWindow, QAction, qApp, QApplication
from PyQt5.QtGui import QIcon
# Action

class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):
        # 快捷键，        # hover 时候的 statusTip        # 信号槽触发退出
        exitAct = QAction(QIcon('exit.png'), '&Exit', self)
        exitAct.setShortcut('Ctrl+Q')
        exitAct.setStatusTip('Exit application')
        # action的触发函数
        exitAct.triggered.connect(qApp.quit)

        # 创建statusBar
        self.statusBar()

        # window的菜单栏
        menubar = self.menuBar()
        # 添加一个file的菜单
        fileMenu = menubar.addMenu('&File')
        #file菜单添加一个action
        fileMenu.addAction(exitAct)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Simple menu')
        self.show()


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())