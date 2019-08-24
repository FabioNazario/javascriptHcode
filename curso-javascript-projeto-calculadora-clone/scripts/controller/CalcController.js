class CalcController{

    constructor(){
        
        this._operation = [''];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._displayDateEl = document.querySelector("#data");
        this._displayTimeEl = document.querySelector("#hora");
        this._currentDate;
        this._lastOperationDone = [];

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboardEvents();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    getPenultimateOperation(){
        return this._operation[this._operation.length-2];
    }

    pushOperation(value){
        
        //if (!this.isMathOperator(value)){
        //    value = parseFloat(value);
        //}
       
        this._lastOperationDone = [];
        
        if (value == '%'){
            this._operation.push('/');
            this._operation.push(100);
            this.calculate();
        }else{
            this._operation.push(value);

            if (this._operation.length > 3){
                this.calculate();    
            }
        }
    }

    addPoint(){
        console.log(this.getLastOperation());

        if(this._operation[this._operation.length-1].indexOf('.') == -1){
            if (this.getLastOperation() == '' || this.getLastOperation == '0' ){
                this._operation[this._operation.length-1] = '0.';
            }else if( this.isMathOperator(this._operation[this._operation.length-1]) ){
                this._operation.push('0.');
            }else{
                this._operation[this._operation.length-1] += '.';
            }
        }


        this.displayCalc = this.getLastOperation();
    }

    equalsCalculate(){
        if(this._operation.length == 2 && this._lastOperationDone.length == 0){
            this._lastOperationDone = this._operation;
        }

        if (this._lastOperationDone.length != 0){
                    this._operation.push(this._lastOperationDone[0], this._lastOperationDone[1]);
        }else{
            this._lastOperationDone.push(this.getPenultimateOperation(),this.getLastOperation());
        }
        
        this.calculate();
    }

    calculate(){
        

        if ( this.isNumber( this.getLastOperation() ) ){
            this._operation = [eval(this._operation.join("")).toString()];
        }else{
            let last = this._operation.pop();
            this._operation = [eval(this._operation.join("")).toString()];
            this._operation.push(last);
        }
        this.displayCalc = this._operation[0];
    }

    isNumber(value){
        return !isNaN(value);
    }

    isMathOperator(value){
        return ['+','-','*','/','%'].indexOf(value) > -1;
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    addOperation(value){

        let lastOperation = this.getLastOperation();

        if(this.isNumber(value)){
            if(this.isNumber(lastOperation)){
                if ((lastOperation != '0' || value != '0') && (lastOperation != '' || value != '0')){
                    this._operation[this._operation.length - 1] += value;   
                }
            }else{
                this.pushOperation(value);
            }
            this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1];
        }else{
            if(this.isMathOperator(lastOperation)){
                this._operation[this._operation.length - 1] = value;
            }else{
                this.pushOperation(value);
            } 
        }
    }

    setError(){
        this.displayCalc = 'ERROR';
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000);
    }


    clearAll(){
        this._operation = [''];
        this.displayCalc = '0';
    }

    clearEntry(){
        let val = this._operation.pop();
        if (this.isMathOperator(val)){
            this._operation.pop();
        }
        this.displayCalc = '0';
    }

    inputOperation(value){
        switch(value){
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'igual':
                this.equalsCalculate();
                break;
            case 'ponto':
                this.addPoint();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);
                console.log(this.getLastOperation());
                this.displayCalc = this.getLastOperation() == '' ? '0' : this.getLastOperation();
                break;                
            default:'ERROR'
                this.setError();
        }
        console.log(this._lastOperationDone);
        console.log(this._operation);
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event,fn,false);
        })
    }

    initKeyboardEvents(){
        document.addEventListener('keyup', e=>{
            switch(e.key){
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(e.key);
                    this.displayCalc = this.getLastOperation() == '' ? '0' : this.getLastOperation();
                break;
                case '.':
                    this.addPoint();
                    break;
                case '=':
                case 'Enter':
                    this.equalsCalculate();
                break;   
                case 'Escape':
                    this.clearAll();
                break;
                case 'Backspace':
                    this.clearEntry();
                break;

                break;  
            }
            
            console.log(this._operation);
        })
    }

    initButtonsEvents(){
        let buttons =  document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e=>{
                //console.log(btn.className.baseVal.replace("btn-",""));
                this.inputOperation(btn.className.baseVal.replace("btn-",""));
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