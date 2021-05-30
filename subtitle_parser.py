import os

def drop(str):
    return str.strip()

def clearEmptyLine(str):
    return str or str.isspace()

def clearOnlyDigit(str):
    return not str.isdigit()

basePath = '###'
dirlists = list( filter( os.path.isdir, [os.path.join(basePath,i) for i in os.listdir(basePath)] ) )
for subDir in dirlists:
    print('当前目录：' + subDir)
    for file in os.listdir(subDir):
        fName, fType = os.path.splitext(file)
        if fType == '.srt':
            print('正在读入：' + file)
            inputF = open(os.path.join(subDir,file),encoding='utf-8')
            print('正在写入：' + fName + '_Nice' + fType)
            outputF = open( os.path.join( subDir,fName + '_Nice' + fType),'w',encoding='utf-8')
            allLines = list(filter(clearOnlyDigit,filter(clearEmptyLine,map(drop, inputF.readlines()))))
            count = 1
            for i,line in enumerate(allLines,start=1):
                if i % 2 == 1:
                    outputF.write( str(count) + '\n')
                    outputF.write( line + '\n')
                if i % 2 == 0:
                    outputF.write( line + '\n\n')
                    count = count + 1
            outputF.flush()
            outputF.close()



