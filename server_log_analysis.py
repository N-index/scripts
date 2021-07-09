import re


def read_log(fp) -> dict:
    ips = {}
    with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
        all_request_count = 0
        for line in f:
            result = parse_ip(line)
            if result:
                ip = result.group()
                ips[ip] = ips[ip] + 1 if ip in ips else 1
                all_request_count += 1
    f.close()
    return {'all_request_count': all_request_count, 'ips': ips}


def parse_ip(line):
    pattern = "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]"
    return re.search(pattern, line)


def main():
    data = read_log('d:\\desktop\\uwsgi.txt')
    all_request_count = data.get('all_request_count')
    unsorted_ips: dict = data.get('ips')
    sorted_ips: list = sorted(unsorted_ips.items(), key=lambda item: item[1], reverse=True)
    print(f'共有{len(sorted_ips)}个IP地址访问, 共访问{all_request_count}次。')
    print(f'平均每个IP访问{all_request_count // len(sorted_ips)}次')
    print('排名前5的地址是：')
    for ip, count in sorted_ips[:5]:
        print(ip, count, sep='\t')


main()
