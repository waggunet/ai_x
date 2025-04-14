def safe_index(lst, item):
    """
    lst 안에 item 요소가 있으면 item 요소의 index를 반환, 없으면 -1qksghks
    lst :나열 가능한 데이터
    item : 찾을 데이터
    """
    if item in lst:
        return lst.index(item)
    else:
        return -1
#    return lst.index(item) if item in lst else -1