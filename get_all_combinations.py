# 獲取一個字符串的所有排列組合，長度為 N 的字符串的所有排列組合的個數為 N！。
# 本代碼在所有字母均不同的情況下尚可，但沒有進行某種程度的緩存，所以有重複字母的情況時仍會進行遍歷。

def factorial(length):
    if length==1:
        return 1
    else:
        return length * factorial(length-1)


def get_all_combinations(string):

    if len(string) == 1:
        return string

    # 所有排列
    all_combinations = []
    
    # 轮流当首位
    for index, first_char in enumerate(string):
        
        # 除 first_char 之外的字符串的所有组合
        left = string[:index]
        right = '' if index == len(string)-1 else string[index+1:]
        rest_combinations = get_all_combinations(left + right)
        
        # 内部所得所有结果加上 first_char
        current_index_combinations = [first_char + rest_combination for rest_combination in rest_combinations]
        
        # 最终结果加上 以 first_char 为首位的所有组合
        all_combinations += current_index_combinations

    return all_combinations

def main(mystr):
    # 阶乘
    expected_count = factorial(len(my_str))
    # 所有组合
    all_combinations = get_all_combinations(my_str)

    print(expected_count)
    # 验证数量
    print(expected_count==len(all_combinations))
    # 结果太大
    # print(all_combinations)


    # details
    file = open(r"d:\desktop\fuck.txt",'w')
    file.write(str(all_combinations))
    file.flush()
    file.close()
        
main("abcdefghi")
        
        
        
