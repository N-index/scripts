"""
This program creates a skeleton of
a classic GUI application with a menubar,
toolbar, statusbar, and a central widget.
基础骨架
"""

import sys
from PyQt5.QtWidgets import QMainWindow, QTextEdit, QAction, QApplication,qApp
from PyQt5.QtGui import QIcon


class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):
        # 添加文本框到中心
        textEdit = QTextEdit()
        self.setCentralWidget(textEdit)

        exitAct = QAction(QIcon('exit.ico'), 'Exit', self)
        exitAct.setShortcut('Ctrl+Q')
        exitAct.setStatusTip('Exit application')
        # 两种退出方法都可以
        # exitAct.triggered.connect(self.close)
        exitAct.triggered.connect(qApp.quit)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&File')
        # 复用action
        fileMenu.addAction(exitAct)

        toolbar = self.addToolBar('Exit')
        # 复用action
        toolbar.addAction(exitAct)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('Main window')
        self.show()


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())