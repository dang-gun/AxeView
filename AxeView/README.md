# AxeView

�ڹٽ�ũ��Ʈ���� ���(View-Model) ���·� HTML�� �ٷ� �� �ְ� ���ִ� ���̺귯���Դϴ�.

���� ���(View-Model)�� �����Ͽ� �������ݴϴ�.  
��𵨿� �����Ͽ� �����͸� ���� ������ �����ϰ� View�� �ݿ��� �� �ֽ��ϴ�.

�ҽ��ڵ�� Ÿ�Խ�ũ��Ʈ�� ��������� �ڹٽ�ũ��Ʈ������ ������� ��밡���մϴ�.

���� : https://dang-gun.github.io/AxeView1Test/Example/test_StartUp.html

## Index
  - [�ֿ� ���](#�ֿ�-���) 
  - [���� �ϱ�](#����-�ϱ�)
  - [�׽�Ʈ �غ���](#�׽�Ʈ-�غ���)
  - [����](#����)
  - [���� �̷�](#����-�̷�)
  - [�⿩ ���](#�⿩-���)
  - [���� �� �⿩��](#����-��-�⿩��)
  - [���̼���](#���̼���)


## �ֿ� ���

- ��(View)�� ��(Model)�� ����
- �ؽ�Ʈ���(TextNode) ����
- ��(dom) ���� �� ���� �ڵ�ȭ
- �̺�Ʈ ����


## ���� �ϱ�

- [�ٿ�ε� - javascript]()
- [�ٿ�ε�(�ҽ�) - typescript]()

�Ʒ� ��ħ�� ���� ��ġ�� �ּ���.

### �ʿ�����

ES6, Typescript 5

### ��ġ


1. �ٿ�ε��� ������ ������ ��ġ�� Ǯ���ݴϴ�.
2. �Ʒ��� ���� ����Ʈ �����ݴϴ�.


```
import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "./AxeView/AxeView";
```


## �׽�Ʈ �غ���

### �׽�Ʈ ������Ʈ ���� (����)

�ٿ�ε�� ������Ʈ�� ���־� ��Ʃ��� 20xx���� ����� �Ϸ��� ".vscode/launch.json"�� ���� ������ �־�� �մϴ�.

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


### �׽�Ʈ �ڵ� �ۼ�

HTML�� �Ʒ� �ڵ带 �߰����ݴϴ�.

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
�Ʒ��� ���� �׽��並 ����Ʈ �������ݴϴ�.

```
import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType, AxeViewDomInterface } from "../AxeView/AxeView";
```

<br />
�׽��� ��ü�� ����� ���ô��(Overwatch) ����Ʈ�� �����մϴ�.

```
/** �׽��� ��ü */
private AxeView: AxeView = new AxeView();

/** AxeView �׽�Ʈ�� ���� */
private arrTarget: Overwatch[] = [];
```

<br />
�Ʒ��� ���� ��� ���� �����ϴ� �۾��� ���ݴϴ�.

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
������ ���� ���ô���� ���� HTML DOM�� �����ϱ����� ���ε��� �����ݴϴ�.

```
//�� ����� �� ������ ��� ����
this.AxeView.BindOverwatch(
	document.getElementById("divAxeViewTset0")
	, this.arrTarget);
```

<br />
���� �����ϸ� ���ٸ� �۾� ���� �䰡 �����Ǵ� ���� �� �� �ֽ��ϴ�.

## ����
[����]()



## ���� �̷�


#### 2023-06-04 : 
- 


## �⿩ ���

������Ʈ�� '��ũ(Fork)'�Ͽ� '���ο� ��ġ(new branch)'�� ���� �� 'Ǯ ������Ʈ(pull request)'���ּ���.

## ���� �� �⿩��
  - [dang-gun](https://github.com/dang-gun)

���ŵ��� �ʴ� �⿩�� ����� [�⿩��](https://github.com/dang-gun/AxeView/contributors)���� Ȯ���� �� �ֽ��ϴ�.


## ���̼���
[MIT](https://github.com/dang-gun/AxeView/blob/main/LICENSE)
