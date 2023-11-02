## morgorithm

### PR 활용법
0. 항상 보내기 전에 pull부터 실행합시다.
```
git pull origin master
```
1. git branch 생성하고 그 branch로 이동함
```
git checkout -b <branch 이름>
```
2. 작업한 코드를 add, commit, push함
```
git add .
git commit -m 'commit message'
git push origin <branch 이름>
```
3. PR 승인 대기하기
4. Merge 이후 동기화 및 branch 삭제할 것
```
git checkout master
git pull origin master
git branch -d <branch 이름>
```
