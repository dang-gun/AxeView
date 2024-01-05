# AxeView

자바스크립트에서 뷰모델(View-Model) 형태로 HTML을 다룰 수 있게 해주는 라이브러리입니다.

돔과 뷰모델(View-Model)을 연결하여 관리해줍니다.  
뷰모델에 접근하여 데이터를 쉽고 빠르게 수정하고 View에 반영할 수 있습니다.

소스코드는 타입스크립트로 재공되지만 자바스크립트에서도 빌드없이 사용가능합니다.

데모 : https://dang-gun.github.io/AxeView1Test/Example/test_StartUp.html

## Index
  - [주요 기능](#주요-기능) 
  - [시작 하기](#시작-하기)
  - [테스트 해보기](#테스트-해보기)
  - [문서](#문서)
  - [수정 이력](#수정-이력)
  - [기여 방법](#기여-방법)
  - [저자 및 기여자](#저자-및-기여자)
  - [라이선스](#라이선스)


## 주요 기능

- 뷰(View)와 모델(Model)의 연결
- 텍스트노드(TextNode) 분해
- 돔(dom) 추적 및 변경 자동화
- 이벤트 연결


## 시작 하기

- [다운로드 - javascript]()
- [다운로드(소스) - typescript]()

아래 지침에 따라 설치해 주세요.

### 필요조건

ES6, Typescript 5

### 설치


1. 다운로드한 파일을 적절한 위치에 풀어줍니다.
2. 아래와 같이 임포트 시켜줍니다.


```
import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "./AxeView/AxeView";
```


## 테스트 해보기

### 테스트 프로젝트 세팅 (선택)

다운로드된 프로젝트를 비주얼 스튜디오 20xx에서 디버깅 하려면 ".vscode/launch.json"에 다음 내용이 있어야 합니다.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "edge",
      "request": "launch",
      "name": "localhost (Edge)",
      "url": "http://localhost:9401",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "localhost (Chrome)",
      "url": "http://localhost:9401",
      "webRoot": "${workspaceFolder}"
    }
  ]
}

```


### 테스트 코드 작성

HTML에 아래 코드를 추가해줍니다.

```
<div id="divAxeViewTset0">
	<input type="radio" name="CssTest1" id="radioCssTest1" value="1" onchange="{{RadioChange}}" />R
	<input type="radio" name="CssTest1" id="radioCssTest1" value="2" onchange="{{RadioChange}}" />G
	<input type="radio" name="CssTest1" id="radioCssTest1" value="3" onchange="{{RadioChange}}" />B
	<div style="{{CssTest1}}">
		{{StringTest1}}
	</div>
</div>
```

<br />
아래와 같이 액스뷰를 임포트 스시켜줍니다.

```
import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType, AxeViewDomInterface } from "../AxeView/AxeView";
```

<br />
액스뷰 개체와 뷰모델인 감시대상(Overwatch) 리스트를 선언합니다.

```
/** 액스뷰 개체 */
private AxeView: AxeView = new AxeView();

/** AxeView 테스트용 변수 */
private arrTarget: Overwatch[] = [];
```

<br />
아래와 같이 뷰와 모델을 연결하는 작업을 해줍니다.

```
this.arrTarget.push(
	this.AxeView.New_MonitoringString("StringTest1", "")
);

this.arrTarget.push(
	this.AxeView.New_MonitoringString("CssTest1", "AxeCss")
);

this.arrTarget.push(
	new Overwatch({
		Name: "RadioChange"
		, FirstData: (
			event: Event
			, sender: ChildNode
			, objThis: Overwatch) =>
		{
			let radio: HTMLInputElement = event.target as HTMLInputElement;

			switch (radio.value)
			{
				case "1"://R
					this.arrTarget[0].data
						= "background-color: #ff0000;"
					this.arrTarget[1].data
						= "background-color: #ff0000;"
					break;
				case "2"://G
					this.arrTarget[0].data
						= "background-color: #00ff00;"
					this.arrTarget[1].data
						= "background-color: #00ff00;"
					break;
				case "3"://B
					this.arrTarget[0].data
						= "background-color: #0000ff;"
					this.arrTarget[1].data
						= "background-color: #0000ff;"
					break;
			}

		}
		, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
		, OverwatchingType: OverwatchingType.Monitoring
		, OverwatchingOneIs: false
	}));
```

<br />
위에서 만든 감시대상을 실제 HTML DOM과 연결하기위해 바인딩을 시켜줍니다.

```
//돔 재생성 및 설정된 뷰모델 연결
this.AxeView.BindOverwatch(
	document.getElementById("divAxeViewTset0")
	, this.arrTarget);
```

<br />
이제 실행하면 별다른 작업 없이 뷰가 수정되는 것을 볼 수 있습니다.

## 문서
[문서]()



## 수정 이력


#### 2023-06-04 : 
- 


## 기여 방법

프로젝트를 '포크(Fork)'하여 '새로운 벤치(new branch)'를 만든 후 '풀 리퀘스트(pull request)'해주세요.

## 저자 및 기여자
  - [dang-gun](https://github.com/dang-gun)

갱신되지 않는 기여자 목록은 [기여자](https://github.com/dang-gun/AxeView/contributors)에서 확인할 수 있습니다.


## 라이선스
[MIT](https://github.com/dang-gun/AxeView/blob/main/LICENSE)
