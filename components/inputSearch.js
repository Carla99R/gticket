import React, { Component } from 'react';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';



import {
  View,Incubator
} from 'react-native-ui-lib';
import Text from '../components/text'
const {TextField} = Incubator;

import { ScaledSheet, verticalScale } from 'react-native-size-matters';

function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
  }
};
Number.prototype.format = function(n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


import Base from '../utils/base'

export default class Input extends Base {
  constructor(props) {
    super(props);

    this.state = {
          
        valor:'',
        limite:30,
        min:0,
        error:'',
        ayuda:'',
        mask:false,
        placeholder:'',
        type:'full',
        foco:false,
        ico:'',
        editable:true,
        decimalTmp:0,
        keytype:'number-pad',
        secureTextEntry:false
      }
      this.focus=this.focusIn.bind(this)

  }
  async componentDidMount() {
    
    var keyboardType="default"
       if(this.props.type=="numero" || this.props.type=="decimal" || this.props.type=="passwordnum" || this.props.type=="telfmovistar" || this.props.type=="telfdigitel" ){
        keyboardType="decimal-pad"
       }
       if(this.props.type=="text" || this.props.type=="full"  || this.props.type=="full2"  || this.props.type=="textspace" ){
        keyboardType="default"
       }
       if(this.props.type=="email" ){
        keyboardType="email-address"
       }
    this.setState({
          valor:this.props.valor?this.props.valor:'',
          limite:this.props.limite?this.props.limite:30,
          min:this.props.min?this.props.min:0,
          editable:this.props.editable?this.props.editable:true,
          ayuda:this.props.ayuda,
          mask:this.props.mask?this.props.mask:false,
          ico:this.props.ico,
          title:this.props.title,
          placeholder:this.props.placeholder,
          type:this.props.type?this.props.type:'full',
          keytype:keyboardType,
          secureTextEntry:this.props.secureTextEntry?this.props.secureTextEntry:false
      });

  }
  componentDidUpdate(prevProps) {
      
      if(prevProps.placeholder!=this.props.placeholder){
          this.setState({placeholder:this.props.placeholder})
      }
      if(prevProps.ayuda!=this.props.ayuda){
          this.setState({ayuda:this.props.ayuda})
      }
      if(prevProps.ico!=this.props.ico){
          this.setState({ico:this.props.ico})
      }
      if(prevProps.limite!=this.props.limite){
          this.setState({limite:this.props.limite})
      }
      if(prevProps.valor!=this.props.valor){
          this.setState({valor:this.props.valor})
      }
      if(prevProps.type!=this.props.type){
          this.setState({type:this.props.type})
      }

  }
  errorValid(text){
      this.setState({error:text?text:'Campo obligatorio.'})
  }
  clearErrorValid(){
      this.setState({error:''})
  }

  onlyPhone( str,codigoteld) {
    
    if(str==''){
        return true
    }
    if(String(str).length==1){
       
        var ss=String(str).substr(0,1).match("^[0]");
        return ss;
    }else  if(String(str).length==2){
        var rr=null
        codigoteld.map((v)=>{
            if(String(str)==String(v).substr(0,2)){
                rr=true
            }
        })
        return rr
        
    }else  if(String(str).length==3){
        var rr=null
        codigoteld.map((v)=>{
            if(String(str)==String(v).substr(0,3)){
                rr=true
            }
        })
        return rr
    }else  if(String(str).length==4){
        var rr=null
        codigoteld.map((v)=>{
            if(String(str)==String(v).substr(0,4)){
                rr=true
            }
        })
        return rr
    }else if(String(str).length>4){
        var reg = /^[0-9]+$/;
        if(reg.test(String(str).substr(4))){
            return true;
        }else{
            return null;
        }
    }else if(String(str).length>4){
      var reg = /^[0-9]+$/;
        if(reg.test(String(str).substr(4))){
            return true;
        }else{
            return null;
        }
    }
  }
  validCatacterForm(e) {
    if(this.state.type=="password" || this.state.type=="passwordnum" || this.state.secureTextEntry){
    var valor=String(e);
    }else{
     // var valor=String(e).toUpperCase();
     var valor=String(e);
    }
    if (String(valor).length <= this.state.limite) {
        
        if(this.state.type=="textnumberspace"){
          var vv=String(valor).replace(/[^a-zA-Z0-9 ]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="password" || this.state.type=="passwordnum"){
          if(String(valor).length>String(this.state.valor).length ){
           

            

            var ultimo=String(valor).substring(String(valor).length-1)
            if(ultimo!=String.fromCharCode(8858)){
              var vv=String(this.state.valor+ultimo).replace(/[^a-zA-Z0-9·&\-,$+*/%=?¿!._+*%#_/\\=$-&.,()¿?¡!{}><:;"@']+/gi, '')
            
              valor=vv
              this.setState({ valor:vv });
            }
            
          }else{
            var ultimo=String(this.state.valor).substr(0,String(this.state.valor).length-1)
            var vv=String(ultimo).replace(/[^a-zA-Z0-9·&\-,$+*/%=?¿!._+*%#_/\\=$-&.,()¿?¡!{}><:;"@']+/gi, '')
            
            valor=vv
            this.setState({ valor:vv });
          }
         
        }
        if(this.state.type=="usuarioligero"){
          var vv=String(valor).replace(/[^a-zA-Z0-9·&\-,$+*/%=?¿!._+*%#_/\\=$-&.,()¿?¡!{}><:;"@'àáÀÁèéÈÉíÍòÒÑñ ]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="text"){
          var vv=String(valor).replace(/[^a-zA-Z]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="telfmovistar"){
          var vv=String(valor).replace(/[^0-9]+/gi, '')
          if(this.onlyPhone(vv,["0414","0424"])){
            valor=vv
            this.setState({ valor:vv });
          }else{
            valor=String(valor).substr(0,String(valor).length-1)
            this.setState({ valor });
          }
         
          
          
        }
        if(this.state.type=="telfdigitel"){
          var vv=String(valor).replace(/[^0-9]+/gi, '')
          if(this.onlyPhone(vv,["0412"])){
            valor=vv
            this.setState({ valor:vv });
          }else{
            valor=String(valor).substr(0,String(valor).length-1)
            this.setState({ valor });
          }
         
          
          
        }
        
        if(this.state.type=="textspace"){
          var vv=String(valor).replace(/[^a-zA-Z ]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="textnumber"){
          var vv=String(valor).replace(/[^a-zA-Z0-9]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="rif"){
          if(this.onlyLettersRIF(valor)!=null){
              if(String(valor).length==1){
                  valor=valor+'-'
              }else if(String(valor).length==2){
                  valor=String(valor).substr(0,1)
              }
              this.setState({ valor });
          }else{
            valor=String(valor).substr(0,String(valor).length-1)
            this.setState({ valor });
          }
        }
       
        if(this.state.type=="numero"){
          var vv=String(valor).replace(/[^0-9]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="decimal"){

          var vv=null;
          var decimalTmp=0;
          decimalTmp=String(valor).replace(/[^0-9]+/gi, '')
          vv=parseFloat(decimalTmp)/100
         
          if(!isNaN(vv)){
            valor=String(Number(vv).format(2, 3, '.', ','))
            this.setState({ valor:String(Number(vv).format(2, 3, '.', ',')) });
            if(typeof this.props.keypress ){
              this.props.keypress(String(Number(vv).format(2, 3, '.', ',')))
            }
          }else{
            valor=String(0)
            this.setState({ valor:String(0) });
            if(typeof this.props.keypress ){
              this.props.keypress(String(0))
            }
          }

        }
        if(this.state.type=="email"){
          if(this.onlyMail(valor)!=null ){
              this.setState({ valor:String(valor).toUpperCase() });
              valor=String(valor).toUpperCase()
          }else{
            valor=String(valor).substr(0,String(valor).length-1)
            this.setState({ valor });
            valor=String(valor).toUpperCase()

          }
        }
        
    }
    return valor
  }
  find(){
    this.props.find(this.valorSel())
  }
  clear(){
      this.setState({valor:'',error:'',limite:this.props.limite?this.props.limite:11,ayuda:this.props.ayuda,ico:this.props.ico});
      this.refs.mInput.clear()
      
  }
  focusIn(){
    
    this.refs.mInput.focus()
    //this.setState({valor:""})
  }
  valorSel(){
    return this.state.valor;
  }
  valorSet(v){
    this.setState({valor:v})
  }
  valid(callback=function(){}){
    if(this.state.valor && this.state.valor!=undefined && String(this.state.valor).length>=this.state.min){
      this.setState({error:""})
          return true
      }else{
        if(this.state.min==0 || String(this.state.valor).length==0 ){
          this.setState({error:"Obligatorio",viewError:this.props.viewError?this.props.viewError:true})
          callback("Ingrese campo "+this.props.title)
         
        }else{
          var tt="caracteres"
          if(this.state.type=="numero"){
            tt="dígitos"
          }
          if(this.state.min==this.state.limite){
            this.setState({error:"Debe ser igual a "+String(this.state.min)+" "+tt+" ",viewError:this.props.viewError?this.props.viewError:true})
            callback("Debe ser igual a "+String(this.state.min)+" "+tt+" ")
          }else{
            
            this.setState({error:"Debe ser mayor o igual a "+String(this.state.min)+" "+tt+" ",viewError:this.props.viewError?this.props.viewError:true})
            callback("Debe ser mayor o igual a "+String(this.state.min)+" "+tt+" ")
          }
         
        }
        /*
        this.refs.mInput.focus()
        this.setState({error:"Favor ingrese campo "+this.props.title})
          callback("Favor ingrese campo "+this.props.title)
          return false;
       */   
      }
  }
  renderPrice(value) {
    const hasValue = Boolean(value && value.length > 0);

    value=(value/100)
    return (
      <View row style={{flexDirection:'row',marginTop:28,display:hasValue?'flex':'none'}}>
        
        <Text style={{fontSize:16}}>
          {hasValue ? Number(value).format(2, 3, '.', ',') : '00'}
        </Text>
        <Text text80 dark60 style={{paddingLeft:4}}>
          Bs
        </Text>
      </View>
    );
  }
  isFocused(){

  }
  focus(){
    this.focusIn()

  }
    render() {
        return (<>
                    <View style={[{paddingTop:4}]}><TextField 
                    ref={'mInput'}  
                   
                    floatingPlaceholderStyle={styles.float} 
                    style={[styles.input,{borderColor:this.state.foco?"#0058ff":"#3466EC",borderRadius:verticalScale(10),backgroundColor:"#fff"}]} 
                    onChangeText={(e)=>{ this.validCatacterForm(e)}} 
                    transformer={(e)=>{
                      if(this.state.type=="password" || this.state.type=="passwordnum"){
                        return ''.padStart(String(this.validCatacterForm(e)).length,String.fromCharCode(8858))
                      }else{
                        return this.validCatacterForm(e)
                      }
                    }} 
                    hideUnderline={true}
                    autoCapitalize={'none'}
                    value={(this.state.type=="password" || this.state.type=="passwordnum")?"":this.state.valor}
                    returnKeyType={'done'} 
                    keyboardType={this.state.keytype}  
                    enableErrors={false}  
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={"#ccc"}
                    label={this.state.title} 
                    labelStyle={styles.title}
                    labelProps={{allowFontScaling:false}}

                    floatingPlaceholder={false} 
                    editable={this.state.editable}
                    autoCompleteType={'off'}
                    textContentType={'none'}
                    autoCorrect={false}
                    secureTextEntry={this.state.secureTextEntry}
                    maxLength={this.state.limite}
                    importantForAutofill={'no'}
                    onBlur={()=>{
                      this.setState({foco:false})
                    }}
                    onFocus={(e)=>{
                        if(typeof this.props.onFocus === 'function'){
                          this.props.onFocus(e)
                        }
                        this.setState({foco:true})
                      }}
                    onSubmitEditing={()=>{
                      if(typeof this.props.callback === 'function'){
                        this.refs.mInput.blur()
                      this.props.callback('cambiar')
                      }
                      
                    }}
                  />
                  {this.state.valor?<AntDesign style={{position:"absolute",right:10,top:42}} onPress={() => this.find()} name="search1" size={20} color="black" />:<AntDesign style={{position:"absolute",right:10,top:42}} name="search1" size={20} color="#ccc" />}
                  </View>
                  {this.state.error?<Text style={{color:'red',textAlign:"left",paddingHorizontal:4}}>{this.state.error}</Text>:null}
                </>
                );
    }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child: {


  },
  modal: {
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 20 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 20
  },
  input:{
    margin:0,
    borderWidth:1,
    borderColor:'#ccc',
    padding:'12@vs',
    fontSize:'12@vs',
    color:"#000",
    fontFamily:"Roboto",
    borderRadius:'10@vs',
    height:'43@vs'
  },
  title:{
    fontSize:'13@vs',
    color:"#000",
    fontFamily:"Roboto"
  },
  float:{
    fontSize:'16@vs',
    color:'#045392',
    paddingTop:'10@vs',
    paddingLeft:4
  },
  modal2: {
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * 8
  },
});
