import streamlit as st
from openai import OpenAI
import os
from dotenv import load_dotenv

def askGpt(prompt):
    "GPT에게 prompt요청 결과 반환"
    load_dotenv()
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4.1-nano",
        messages=[
            {"role":"system", 
            "content":"당신은 한국어로 된 텍스트를 잘 요약하는 전문 어시스턴트입니다"
            },
            {"role":"user", "content":prompt}
        ]
    )
    return response.choices[0].message.content

# 기능구현
def main():
    # result = askGpt("""아래 글을 30자로 요약해주세요.
    #                 텍스트 : 삼성전자는 기초 과학의 중요성에 대한 사회적 인식을 높이고 미래 과학 인재 양성에 기여하기 위해 
    #                 올림피아드 후원을 결정했다고 설명했다. 그동안 비공식적으로 올림피아드 대표단을 후원한 적은 있지만, 
    #                 협약을 맺고 공식 후원에 나서는 것은 이번이 처음이다. 
    #                 이번 협약에 따라 삼성전자는 올림피아드 한국대표단의 선발과 교육, 대회 참가를 지원하고, 
    #                 대회 수상자에게는 별도의 장학금도 전달할 계획이다.
    #                 """)
    # print(result)
    st.header("요약 프로그램")
    st.markdown("---")
    text = st.text_area("요약할 글을 입력하세요")
    if st.button("요약"):
        # st.info(text)
        Prompt = f"""your task is to summarize the text sentences in korean, summarize in 1line"""
        result = askGpt(text)
        st.info(result)




if __name__ == "__main__":
    main()