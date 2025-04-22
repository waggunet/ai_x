
import os
import csv

# Customer 클래스
class Customer:
    def __init__(self, name, phone, email, age, grade, etc):
        self.name = name
        self.phone = phone
        self.email = email
        self.age = int(age)
        self.grade = int(grade)
        self.etc = etc

    def to_list_style(self):
        return [self.name, self.phone, self.email, str(self.age), str(self.grade), self.etc]

    def as_dic(self):
        return {
            "이름": self.name,
            "전화": self.phone,
            "이메일": self.email,
            "나이": self.age,
            "등급": self.grade,
            "기타": self.etc
        }

    def __str__(self):
        return f"{self.name} | {self.phone} | {self.email} | {self.age}세 | 등급: {self.grade} | {self.etc}"


# 0. 데이터 로드
def load_customers():
    path = "data/ch09_customers.txt"
    customer_list = []

    if not os.path.exists(path):
        os.makedirs("data", exist_ok=True)
        open(path, "w", encoding="utf-8").close()
        return []

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(",")
            if len(parts) == 6:
                customer_list.append(Customer(*parts))
    return customer_list


# 1. 고객 입력
def fn1_insert_customer_info():
    name = input("이름: ")
    phone = input("전화번호: ")
    email = input("이메일: ")
    age = input("나이: ")
    grade = input("등급(1~5): ")
    etc = input("기타사항: ")
    return Customer(name, phone, email, age, grade, etc)


# 2. 전체 고객 출력
def fn2_print_customers(customer_list):
    for idx, customer in enumerate(customer_list, start=1):
        print(f"[{idx}] {customer}")


# 3. 고객 삭제
def fn3_delete_customer(customer_list):
    target = input("삭제할 고객 이름: ")
    removed = [c for c in customer_list if c.name != target]
    if len(removed) < len(customer_list):
        print(f"{target} 삭제 완료.")
    else:
        print("해당 이름 없음.")
    return removed


# 4. 고객 검색
def fn4_search_customer(customer_list):
    keyword = input("검색할 고객 이름: ")
    for c in customer_list:
        if keyword in c.name:
            print(c)


# 5. CSV 저장
def fn5_save_customer_csv(customer_list):
    with open("customers.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["이름", "전화", "이메일", "나이", "등급", "기타"])
        writer.writeheader()
        for c in customer_list:
            writer.writerow(c.as_dic())
    print("CSV 저장 완료.")


# 9. TXT 저장
def fn9_save_customer_txt(customer_list):
    with open("data/ch09_customers.txt", "w", encoding="utf-8") as f:
        for c in customer_list:
            f.write(",".join(c.to_list_style()) + "\n")
    print("종료 전 데이터 저장 완료.")


# 메인 루프
def main():
    customer_list = load_customers()

    while True:
        print("1:입력 | 2:전체출력 | 3:삭제 | 4:이름찾기 | 5:CSV저장 | 9:종료")
        choice = input("메뉴 선택: ")

        if choice == "1":
            customer = fn1_insert_customer_info()
            customer_list.append(customer)
        elif choice == "2":
            fn2_print_customers(customer_list)
        elif choice == "3":
            customer_list = fn3_delete_customer(customer_list)
        elif choice == "4":
            fn4_search_customer(customer_list)
        elif choice == "5":
            fn5_save_customer_csv(customer_list)
        elif choice == "9":
            fn9_save_customer_txt(customer_list)
            break
        else:
            print("잘못된 입력입니다.")

if __name__ == "__main__":
    main()
