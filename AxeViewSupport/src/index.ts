
//AxeView 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../AxeView/src/AxeView/AxeView";


import test_01 from "./Example/test_01";

import test_AutoCreationOverwatch from "./Example/test_AutoCreationOverwatch";


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
				

			case "test_01.html":
				this.PageNow = new test_01();
				break;

			case "test_AutoCreationOverwatch.html":
				this.PageNow = new test_AutoCreationOverwatch();
				break;
		}

		//메뉴 추가
		let domMenu = document.getElementById("divMenu");
		domMenu.innerHTML = "";

		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'index.html">홈</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_AutoCreationOverwatch.html">감시자 자동 생성</a><br />');
		

		domMenu.insertAdjacentHTML('beforeend', '<br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_01.html">테스트</a><br />');

		domMenu.style.marginBottom = "2rem";
	}

}

(window as any).app = new App();
