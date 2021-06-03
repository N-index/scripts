line = input()
ops = line.split(' ')
total_cnt = 0
select_status = False
copy_board_length = 0
for op in ops:
    if op == 1:
        # input
        if select_status:
            total_cnt = 0
            total_cnt += 1
        else:
            total_cnt += 1
    elif op == 2:
        # 复制
        if select_status:
            # 选中则为全选
            copy_board_length = total_cnt
    elif op == 3:
        # 剪切
        if select_status:
            copy_board_length = total_cnt
            total_cnt = 0
    elif op == 4:
        # 粘贴
        if select_status:
            total_cnt = copy_board_length
        else:
            total_cnt += copy_board_length
    elif op == 5:
        # 全选
        select_status = True
print(total_cnt)






