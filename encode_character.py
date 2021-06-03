# interview question.
n = int(input())
for i in range(n):
    prev = list(input().strip())
    after = []
    offset = [1, 2, 4]
    for i, c in enumerate(prev):
        if i >= 3:
            offset.append(offset[i - 1] + offset[i - 2] + offset[i - 3])
        after_c = chr(ord(c) + offset[i])
        after.append(after_c)
    print(''.join(after))
