

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "./AxeView/AxeView";

import test_StartUp from "./Example/test_StartUp";
import test_BasicSample from "./Example/test_BasicSample";
import test_01 from "./Example/test_01";

export default class App
{
	//지금 보여주고 있는 페이지에서 사용할 개체
	public PageNow: any = null;

	constructor()
	{
		//파일명으로 라우터 처럼 동작하게 해준다.
		let arrPath = window.location.pathname.split("/");

		switch (arrPath[arrPath.length - 1])
		{
			case "index.html":
				break;

			case "test_StartUp.html":
				this.PageNow = new test_StartUp();
				break;

			case "test_BasicSample.html":
				this.PageNow = new test_BasicSample();
				break;

			case "test_01.html":
				this.PageNow = new test_01();
				break;
		}
	}

}

(window as any).app = new App();
