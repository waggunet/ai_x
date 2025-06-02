# ch14_맞춤법후.txt를 1000자이내로 자르기
with open('data/ch14_맞춤법후.txt', 'r', encoding='utf-8') as f:
    text = f.read()
ready_list = [] # 맞춤법 검사할 text 내용(300이자 이내로 list)
while(len(text) > 1000):
    temp = text[:1000]
    new_line_char_index = temp.rfind('\n')
    ready_list.append(text[:new_line_char_index])
    text = text[new_line_char_index:]
ready_list.append(text)
print('크롤링 할 text 수 :',[len(ready) for ready in ready_list])
# 크롤링
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
driver = webdriver.Chrome()
time.sleep(0.5)
driver.get('https://translate.kakao.com/')
textarea = driver.find_element(By.CSS_SELECTOR, 'textarea.translate_area.area_item.translate_many')
button = driver.find_element(By.CSS_SELECTOR, 'div.btn_item')
results = ''
for idx, ready in enumerate(ready_list):
    print( f'{round(idx/len(ready_list) * 100, 2)}% 번역 중입니다')
    textarea.clear()
    textarea.send_keys(ready)
    button.click()
    time.sleep(1)

    # soup = BeautifulSoup(driver.page_source, "html.parser")
    # result = soup.select_one('div.result_area.translate_many').text
    result = driver.find_element(By.CSS_SELECTOR, 'div.result_area.translate_many').text
    results += result + '\n\n'
# driver.close()
# 번역한 결과 파일 출력
with open('data/ch14_자동화영어번역본.txt', 'w', encoding='utf-8') as f:
    f.write(results)
print('번역 완료')