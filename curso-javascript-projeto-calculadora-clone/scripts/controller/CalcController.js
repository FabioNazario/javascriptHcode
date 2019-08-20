class CalcController{

    constructor(){

        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._displayDateEl = document.querySelector("#data");
        this._displayTimeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }


    initialize(){
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000);
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event,fn,false);
        })
    }

    initButtonsEvents(){
        let buttons =  document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e=>{
                console.log(btn.className.baseVal.replace("btn-",""));
            })

            this.addEventListenerAll(btn, 'mouseup mouseover mousedown', e=>{
                btn.style.cursor = "pointer"
            })
        })
      
    }

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit"
            ,month: "long"
            ,year: "numeric"
        });
    }

    get displayDate(){
        return this._displayDateEl.innerHTML;
    }

    set displayDate(value){
        this._displayDateEl.innerHTML = value;
    }

    get displayTime(){
        return this._displayTimeEl.innerHTML;
    }

    set displayTime(value){
        this._displayTimeEl.innerHTML = value
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }
}