import React, { Component } from 'react';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../components/text'

import {
    StyleSheet,
    TouchableOpacity
  
} from 'react-native';

import {
  TextInput
} from 'react-native';

import {
  View
} from 'react-native-ui-lib';

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

export default class InputPass extends Base {
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
        keytype:'default',
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
    this.setState({ valor:valor });
    return 
    if (String(valor).length <= this.state.limite) {
        
        
        if(this.state.type=="password" || this.state.type=="passwordnum"){
          if(String(valor).length>String(this.state.valor).length ){
           
            //var ultimo=String(valor).substring(String(valor).length-1)
          //  if(ultimo!=String.fromCharCode(8858)){
              //console.log(this.state.valor+ultimo,e)
             // var vv=String(this.state.valor+ultimo).replace(/[^a-zA-Z0-9·&\-,$+*/%=?¿!._+*%#_/\\=$-&.,()¿?¡!{}><:;"@']+/gi, '')
            
              //valor=vv
              this.setState({ valor:valor });
              if(typeof this.props.keypress === 'function' ){
               // this.props.keypress(String(vv))
              }
           // }
            
          }else{
            /*
            var ultimo=String(this.state.valor).substr(0,String(this.state.valor).length-1)
            
            valor=vv
            this.setState({ valor:vv });
            if(typeof this.props.keypress === 'function' ){
              this.props.keypress(String(vv))
            }*/
          }
        }
    }
    return valor
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
          this.refs.mInput.focus()
         
        }else{
          var tt="caracteres"
          if(this.state.type=="numero"){
            tt="dígitos"
          }
          if(this.state.min==this.state.limite){
            this.setState({error:"Debe ser igual a "+String(this.state.min)+" "+tt+" ",viewError:this.props.viewError?this.props.viewError:true})
            callback("Debe ser igual a "+String(this.state.min)+" "+tt+" ")
            this.refs.mInput.focus()
          }else{
            
            this.setState({error:"Debe ser mayor o igual a "+String(this.state.min)+" "+tt+" ",viewError:this.props.viewError?this.props.viewError:true})
            callback("Debe ser mayor o igual a "+String(this.state.min)+" "+tt+" ")
            this.refs.mInput.focus()
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
  isFocused(){
    return this.refs.mInput.isFocused()
  }
  verValor(tt){
    if(tt=="passwordview"){
     this.setState({passwordview:true})
 
    }else{
     this.setState({passwordview:false})
 
    }
   }
    render() {
        return (<>
                    <View style={[{paddingTop:4,position:"relative"}]}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TextInput 
                    ref={'mInput'}  
                   
                    floatingPlaceholderStyle={styles.float} 
                    style={[styles.input,{borderColor:this.state.foco?"#03A9F4":"#03A9F4",backgroundColor:"#fff"}]} 
                   onChangeText={(e)=>{ this.setState({valor:e})}} 
                     
                    allowFontScaling={false}
                    
                    hideUnderline={true}
                    autoCapitalize={'none'}
                    value={this.state.valor}
                    returnKeyType={'done'} 
                   keyboardType={this.state.keytype}  
                    enableErrors={false}  
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={"#999"}
                    
                    label={this.state.title} 
                    labelStyle={styles.title}
                    labelProps={{allowFontScaling:false}}
                    floatingPlaceholder={false} 
                    editable={this.state.editable}
                    autoCompleteType={'off'}
                    textContentType={'none'}
                    fieldStyle={{fontSize:'13@vs'}}
                    autoCorrect={false}
                    secureTextEntry={true}
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
                  {this.state.passwordview?<View style={{position:"absolute",bottom:1,left:verticalScale(10),backgroundColor:this.state.color?this.state.color:'#fff',height:verticalScale(38),width:"90%",alignContent:"center",flex:1,justifyContent:"center"}}><Text style={{fontSize:verticalScale(14)}}>{this.state.valor}</Text></View>:null}
                  {(this.state.type=="password" || this.state.type=="passwordnum" )?(String(this.state.valor).length>0?<TouchableOpacity onPressIn={()=>this.verValor("passwordview")} onPressOut={()=>this.verValor("password")} style={{position:"absolute",height:verticalScale(30),width:verticalScale(30),right:verticalScale(8),bottom:verticalScale(5)}}><AntDesign name="eyeo" size={verticalScale(26)} color="#000" /></TouchableOpacity>:null):null}
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
    color:"#000",
    padding:'12@vs',
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
