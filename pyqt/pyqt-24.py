#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
ZetCode PyQt5 tutorial

In this example, we select a color value
from the QColorDialog and change the background
color of a QFrame widget.

Author: Jan Bodnar
Website: zetcode.com
Last edited: August 2017
"""

from PyQt5.QtWidgets import (QWidget, QPushButton, QFrame,
    QColorDialog, QApplication)
# 引入QColor
from PyQt5.QtGui import QColor
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):

        col = QColor(0, 0, 0)

        self.btn = QPushButton('Dialog', self)
        self.btn.move(20, 20)
        self.btn.clicked.connect(self.showDialog)

        # 创建一个画布层
        self.frm = QFrame(self)
        # 设置画布的style Sheet
        self.frm.setStyleSheet("QWidget { background-color: %s }"
            % col.name())
        self.frm.setGeometry(130, 22, 100, 100)

        self.setGeometry(300, 300, 250, 180)
        self.setWindowTitle('Color dialog')
        self.show()


    def showDialog(self):

        col = QColorDialog.getColor()
        # 更新读取到的color
        if col.isValid():
            self.frm.setStyleSheet("QWidget { background-color: %s }"
                % col.name())


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())