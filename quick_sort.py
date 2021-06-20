def quick_sort(arr: list):
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    left = []
    right = []
    # 刚开始忘记arr从1开始了，搞了半天。。
    for i in arr[1:]:
        if i < pivot:
            left.append(i)
        else:
            right.append(i)

    left_res = quick_sort(left)
    right_res = quick_sort(right)
    return [*left_res, pivot, *right_res]


input = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]
output = quick_sort(input)
print(output)
