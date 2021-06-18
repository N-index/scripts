#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
ZetCode PyQt5 tutorial
窗口居中！
"""

import sys
from PyQt5.QtWidgets import QWidget, QDesktopWidget, QApplication


class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):

        self.resize(250, 150)
         # 窗口居中
        self.center()

        self.setWindowTitle('Center')
        self.show()


    def center(self):
        # 获得主窗口所在的框架，当前组件window的geometry
        from PyQt5.QtCore import QRect
        qr: QRect = self.frameGeometry()
        # 用户的桌面信息全在 QDesktopWidget 里，桌面组件的可用空间。
        # 获取显示器的分辨率，然后得到屏幕中间点的位置。
        from PyQt5.QtCore import QPoint
        cp: QPoint = QDesktopWidget().availableGeometry().center()
        # 然后把主窗口框架的中心点放置到屏幕的中心位置。
        qr.moveCenter(cp)
        # 然后通过move函数把主窗口的左上角移动到其框架的左上角，这样就把窗口居中了。
        self.move(qr.topLeft())


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())