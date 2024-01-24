

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "./AxeView/AxeView";

import test_StartUp from "./Example/test_StartUp";
import test_Dom from "./Example/test_Dom";
import test_ATag from "./Example/test_ATag";
import test_Option1 from "./Example/test_Option1";
import test_Option2 from "./Example/test_Option2";
import test_Event from "./Example/test_Event";

import test_UnidentifiedType from "./Example/test_UnidentifiedType";
import test_OutputTypeChange from "./Example/test_OutputTypeChange";

import test_BasicSample from "./Example/test_BasicSample";
import test_01 from "./Example/test_01";


export default class App
{
	/** 지금 보여주고 있는 페이지에서 사용할 개체 */
	public PageNow: any = null;

	constructor()
	{
		let sRoot: string = "../";

		//파일명으로 라우터 처럼 동작하게 해준다.
		let arrPath = window.location.pathname.split("/");

		switch (arrPath[arrPath.length - 1])
		{
			case "index.html":
				sRoot = "";
				break;

			case "test_StartUp.html":
				this.PageNow = new test_StartUp();
				break;
			case "test_Dom.html":
				this.PageNow = new test_Dom();
				break;
			case "test_ATag.html":
				this.PageNow = new test_ATag();
				break;
			case "test_Option1.html":
				this.PageNow = new test_Option1();
				break;
			case "test_Option2.html":
				this.PageNow = new test_Option2();
				break;
			case "test_Event.html":
				this.PageNow = new test_Event();
				break;


			case "test_UnidentifiedType.html":
				this.PageNow = new test_UnidentifiedType();
				break;
			case "test_OutputTypeChange.html":
				this.PageNow = new test_OutputTypeChange();
				break;



			case "test_BasicSample.html":
				this.PageNow = new test_BasicSample();
				break;

			case "test_01.html":
				this.PageNow = new test_01();
				break;
		}

		//메뉴 추가
		let domMenu = document.getElementById("divMenu");
		domMenu.innerHTML = "";

		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'index.html">홈</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_StartUp.html">시작하다</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_Dom.html">HTML 돔 처리</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_ATag.html">A태그 처리</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_Option1.html">옵션 처리</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot + 'Example/test_Option2.html">개별 옵션 처리</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot + 'Example/test_Event.html">이벤트 연결</a><br />');

		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot + 'Example/test_UnidentifiedType.html">불확실 타입 사용</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot + 'Example/test_OutputTypeChange.html">타입 변경</a><br />');

		domMenu.insertAdjacentHTML('beforeend', '<br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_BasicSample.html">기본 셈플</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_01.html">테스트</a><br />');

		domMenu.style.marginBottom = "2rem";
	}

}

(window as any).app = new App();
