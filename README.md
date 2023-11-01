## morgorithm

### PR 활용법
1. git branch 생성하고 그 branch로 이동함
```
git checkout -b <branch 이름>
```
2. 작업한 코드를 add, commit, push함
```
git add .
git commit -m 'commit message'
git push origin develop
```
3. PR 승인 대기하기
4. Merge 이후 동기화 및 branch 삭제할 것
```
git pull father
git checkout master
git branch -d <branch 이름>
```
