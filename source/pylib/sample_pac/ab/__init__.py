'''
sample_pac/ab/__init__.py
from sample_pac.ab import * 수행할 경우 
    자동 import될 모듈을 지정할 수 있음(__all__)


sample_pac/ab/a.py
sample_pac/ab/b.py
'''

__all__ = ['a'] # 반드시 리스트로 해야 함
print('sample_pac 패키지 안의 ab패키지 로드됩니다.')