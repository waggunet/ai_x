# sample_pac/cd/c.py
# .은 현재폴더
# ..은 상위폴더

from .. ab import a # 나중에 django 할때 사용될 것임
def nice():
    print('sample_pac/cd/c모듈 안의 nice')
    a.hello() 