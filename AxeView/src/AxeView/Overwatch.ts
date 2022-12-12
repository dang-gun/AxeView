import { OverwatchInterface } from "./OverwatchInterface";
import { AxeViewDomInterface, AxeViewDomType } from "./AxeViewDomInterface";
import { OverwatchingType } from "./OverwatchingType"

/** 감시 대상  */
export class Overwatch implements OverwatchInterface
{
	public Name: string = "";
	/** 이름 검색용 문자열
	 * 자동생성된다.*/
	public NameFindString: string = "";
	 
	public Action: any = null;
	/**
	 * 실제 동작 get
	 * 단순 표시의 경우 이 함수를 재정의 하지 말고 사용한다.
	 */
	private ActionGet: Function = function () { return this.Action; };
	/**
	 * 실제 동작 set
	 * 단순 표시의 경우 이 함수를 재정의 하지 말고 사용한다.
	 */
	private ActionSet: Function = function (data: any)
	{
		this.Action = data;

		if (null !== this._Dom
			&& 0 < this._Dom.length)
		{//돔이 있으면 실행

			//저장된 돔개수만큼 실행
			for (let nDomIdx: number = 0; nDomIdx < this._Dom.length; ++nDomIdx)
			{
				let item: AxeViewDomInterface = this.Dom[nDomIdx];
				//item.innerHTML = data;
				if (AxeViewDomType.Node === item.AxeViewDomType)
				{
					(item.Dom as Node).nodeValue = data;
				}
				else
				{
					(item.Dom as HTMLElement).innerHTML = data;
				}	
			}
			
		}
	};


	public OverwatchingType: OverwatchingType;

	public OverwatchingOneIs: boolean = false;;

	/** 
	 *  연결되있는 돔
	 *  단순 출력의 경우 추가하지 않는다.
	 *  여러개가 연결된 경우 각각의 돔이들어있게 된다.
	 *  'Action'이 어트리뷰트에 연결된 경우 대상 dom이 저장되고,
	 *  innerText영역에 있는 경우 임의로 생성된 태그가 지정된다.
	 * */
	private _Dom: AxeViewDomInterface[] = [];
	/** 연결된 돔 */
	public get Dom(): AxeViewDomInterface[]
	{
		return this._Dom;
	}

	/**
	 * 연결된 돔 추가 - Element
	 * @param domPushData
	 */
	public Dom_Push_Element(domPushData: Element)
	{
		this.Dom_Push_HTMLElement(domPushData as HTMLElement);
	}
	/**
	 * 연결된 돔 추가 - HTMLElement
	 * @param domPushData
	 */
	public Dom_Push_HTMLElement(domPushData: HTMLElement)
	{
		this._Dom.push({
			AxeViewDomType: AxeViewDomType.HTMLElement
			, Dom: domPushData
		});
	}
	/**
	 * 연결된 돔 추가 - Node
	 * @param domPushData
	 */
	public Dom_Push_Node(domPushData: Node)
	{
		this._Dom.push({
			AxeViewDomType: AxeViewDomType.Node
			, Dom: domPushData
		});
	}
	
	/** 연결된 돔 비우기 */
	public Dom_Clear()
	{
		this._Dom = [];
	}

	/** 
	 * 모니터링 중인 데이터 - 읽기
	 * Action을 읽어 리턴한다.
	 * UI가 갱신되지 않았다면 UI와 다른 값일 수 있다.
	 * */
	public get data()
	{
		return this.ActionGet();
	}
	/** 
	 *  모니터링 중인 데이터 - 쓰기 
	 *  Action에 데이터를 저장한다.
	 *  설정된 'OverwatchingType'에 따라 화면 갱신이 있을 수 있다.
	 */
	public set data(value: any)
	{
		this.ActionSet(value);
	}
	/** 지금 가지고 있는 데이터를 다시 출력시도한다.
	 * dom이 새로 설정됐다면 꼭 호출해야 한다.*/
	public DataRefresh()
	{
		this.data = this.data;
	}



	/** 'OverwatchingType'가 한번만 적중해야 하는 옵션인경우 
	 * 맨처음 적중하면 true가 된다.*/
	public OneDataIs: boolean = false;

	constructor(target: OverwatchInterface)
	{
		this.Name = target.Name;
		this.NameFindString = "{{" + this.Name + "}}";
		this.Action = target.Action;
		this.OverwatchingType = target.OverwatchingType;
		this.OverwatchingOneIs = target.OverwatchingOneIs;
	}

}

