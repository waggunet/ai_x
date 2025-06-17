import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_sales_data(start_year, end_year, records_per_year):
    all_data = []
    coffee_types = ["아메리카노", "카페라떼", "카푸치노", "바닐라라떼", "에스프레소", "콜드브루", "자몽 허니 블랙 티"]

    for year in range(start_year, end_year + 1):
        start_date = datetime(year, 1, 1)
        end_date = datetime(year, 12, 31)
        time_diff = end_date - start_date
        total_seconds = time_diff.total_seconds()

        for _ in range(records_per_year):
            # 무작위 날짜와 시간 생성
            random_second = np.random.uniform(0, total_seconds) # 여기서 np.random.uniform을 사용합니다.
            sale_datetime = start_date + timedelta(seconds=random_second)

            # 무작위 커피 종류 및 판매량 선택
            coffee_type = np.random.choice(coffee_types) # 여기서 np.random.choice를 사용합니다.
            quantity = np.random.randint(1, 6) # 여기서 np.random.randint를 사용합니다.

            all_data.append({
                '날짜': sale_datetime.strftime('%Y-%m-%d %H:%M:%S'),
                '커피 종류': coffee_type,
                '판매량': quantity
            })

    df = pd.DataFrame(all_data)
    return df

# 2022년부터 2024년까지 각 년도당 10000개 데이터 생성
sales_df = generate_sales_data(2022, 2024, 10000)
print(sales_df.head())
print(f"\n총 데이터 개수: {len(sales_df)}개")

# 데이터를 CSV 파일로 저장 (선택 사항)
sales_df.to_csv("coffee_sales_data.csv", index=False, encoding='utf-8-sig')
print("\n'coffee_sales_data.csv' 파일로 저장되었습니다.")