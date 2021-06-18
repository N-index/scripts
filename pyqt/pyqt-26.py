#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
ZetCode PyQt5 tutorial

In this example, we select a file with a
QFileDialog and display its contents
in a QTextEdit.

Author: Jan Bodnar
Website: zetcode.com
Last edited: August 2017
"""

from PyQt5.QtWidgets import (QMainWindow, QTextEdit,
                             QAction, QFileDialog, QApplication, QLabel)
from PyQt5.QtGui import QIcon, QPixmap
import sys

class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):

        self.textEdit = QTextEdit()
        self.setCentralWidget(self.textEdit)
        self.statusBar()

        lbl1 = QLabel('Zetcode', self)
        lbl1.move(50,50)
        self.label = lbl1



        openFile = QAction(QIcon('open.png'), 'Open', self)
        openFile.setShortcut('Ctrl+O')
        openFile.setStatusTip('Open new File')
        openFile.triggered.connect(self.showDialog)

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&File')
        fileMenu.addAction(openFile)

        self.setGeometry(300, 300, 350, 300)
        self.setWindowTitle('File dialog')
        self.show()


    def showDialog(self):
        # 获取文件句柄

        fname = QFileDialog.getOpenFileName(self, '打开图片', 'd:\\desktop\\','图片文件 (*.jpg *.jpeg *.png *.jfif *.gif *.webp)')
        # 弹出QFileDialog窗口。getOpenFileName()
        # 方法的第一个参数是说明文字，第二个参数是默认打开的文件夹路径。默认情况下显示所有类型的文件。
        print(fname)
        if fname[0]:
            # f = open(fname[0], 'r')
            img = QPixmap(fname[0])
            self.label.setPixmap(img)
            self.label.resize(img.width(),img.height())
            self.resize(img.width()+50,img.height()+50)
            # with f:
            #     print(f)
                # data = f.read()
                # self.textEdit.setText(data)

if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())