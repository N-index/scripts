import sys
from PyQt5.QtWidgets import QApplication, QWidget


if __name__ == '__main__':

    app = QApplication(sys.argv)

    w = QWidget()
    w.resize(450, 250)
    w.move(300, 300)
    w.setWindowTitle('Fuck OCR')
    w.show()

    sys.exit(app.exec_())