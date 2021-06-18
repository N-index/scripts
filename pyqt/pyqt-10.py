#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
ZetCode PyQt5 tutorial

This program creates a checkable menu.
可选的菜单
Author: Jan Bodnar
Website: zetcode.com
Last edited: August 2017
"""

import sys
from PyQt5.QtWidgets import QMainWindow, QAction, QApplication

class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):
        # 创建statusbar，并存储临时变量 statusbar，初始信息为ready
        self.statusbar = self.statusBar()
        self.statusbar.showMessage('Ready')

        # view菜单
        menubar = self.menuBar()
        viewMenu = menubar.addMenu('View')

        # action是可选的，hover时的消息为view statusbar，默认状态为 true
        viewStatAct = QAction('View statusbar', self, checkable=True)
        viewStatAct.setStatusTip('View statusbar')
        viewStatAct.setChecked(True)
        # 点击触发 toggleMenu函数，此toggleMenu回调函数会被传入state的参数（action的选中状态）
        viewStatAct.triggered.connect(self.toggleMenu)

        viewMenu.addAction(viewStatAct)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Check menu')
        self.show()

    def toggleMenu(self, state):
        # 切换statusBar的展示状态，statusbar属于当前类，在此调用
        if state:
            self.statusbar.show()
        else:
            self.statusbar.hide()


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())