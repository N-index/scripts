def merge_sort(array) -> list:
    if len(array) == 1:
        return array

    # 分割
    half = len(array) // 2
    left = array[:half]
    right = array[half:]

    # 合并
    left_res = merge_sort(left)
    right_res = merge_sort(right)
    merged = []
    while len(left_res) or len(right_res):

        # 此处的系列判断相对于JS版本来说更完备，JS需要修改
        if not left_res:
            merged.append(right_res.pop(0))
            continue

        if not right_res:
            merged.append(left_res.pop(0))
            continue

        assert len(left_res) > 0 and len(right_res) > 0

        if left_res[0] <= right_res[0]:
            merged.append(left_res.pop(0))
        else:
            merged.append(right_res.pop(0))

    return merged
