from customer import load_customers
from functions import fn1_insert_customer_info, fn2_print_customers
from functions import fn3_delete_customer,fn4_search_customer
from functions import fn5_save_customer_csv, fn9_save_customer_txt

def main():
    global customer_list
    customer_list = load_customers()
    while True:
        print("1:입력|2:전체출력|3:삭제|4:이름검색|5:csv내보내기|9: 종료", end='')
        fn = input("메뉴 선택 : ")
        if fn=='1':
            # print("fn1_호출한 결과를 customer에 받아 customer_list에 append")
            customer = fn1_insert_customer_info()
            customer_list.append(customer)
        elif fn=='2':
            # print('fn2_호출')
            fn2_print_customers(customer_list)
        elif fn=='3':
            # print('fn3_호출')
            fn3_delete_customer(customer_list)
        elif fn=='4':
            # print('fn4_호출')
            fn4_search_customer(customer_list)
        elif fn=='5':
            # print('fn5_호출')
            fn5_save_customer_csv(customer_list)
        elif fn=='9':
            # print('fn9_호출')
            fn9_save_customer_txt(customer_list)
            break

if __name__=='__main__':
    main()
