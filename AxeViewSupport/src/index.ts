
//AxeView 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../AxeView/src/AxeView/AxeView";


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

		domMenu.insertAdjacentHTML('beforeend', '<br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_BasicSample.html">기본 셈플</a><br />');
		domMenu.insertAdjacentHTML('beforeend', '<a href="' + sRoot +'Example/test_01.html">테스트</a><br />');

		domMenu.style.marginBottom = "2rem";
	}

}

(window as any).app = new App();
