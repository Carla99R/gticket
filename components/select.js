import React, { Component } from 'react';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import {
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
  
} from 'react-native';
import Text from '../components/text'
const {TextField} = Incubator;

import {
  View, Incubator,MaskedInput,Colors
} from 'react-native-ui-lib';
import RBSheet from "react-native-raw-bottom-sheet";
import { ScaledSheet,verticalScale } from 'react-native-size-matters';

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
import { requestPermissionsAsync } from 'expo-notifications';
const { width, height } = Dimensions.get('window');

export default class Input extends Base {
  constructor(props) {
    super(props);

    this.state = {
          
        valor:'',
        data:[],
        limite:30,
        error:'',
        ayuda:'',
        mask:false,
        placeholder:'',
        type:'full',
        ico:'',
        editable:false,
        decimalTmp:0,
        keytype:'number-pad'
      }
      this.focus=this.focusIn.bind(this)

  }
  componentDidMount() {
    
    var keyboardType="default"
       if(this.props.type=="numero" || this.props.type=="decimal" ){
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
          ayuda:this.props.ayuda,
          data:this.props.data,
          mask:this.props.mask?this.props.mask:false,
          editable:this.props.editable===false?this.props.editable:true,

          ico:this.props.ico,
          placeholder:this.props.placeholder,
          title:this.props.title,
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
      if(prevProps.editable!=this.props.editable){
        this.setState({editable:this.props.editable})
    }

  }
  errorValid(text){
      this.setState({error:text?text:'Campo obligatorio.'})
  }
  clearErrorValid(){
      this.setState({error:''})
  }
  validCatacterForm(e) {
    if(this.state.type=="password" || this.state.secureTextEntry){
    var valor=String(e);
    }else{
      var valor=String(e).toUpperCase();

    }
    if (String(valor).length <= this.state.limite) {
        
        if(this.state.type=="textnumberspace"){
          var vv=String(valor).replace(/[^a-zA-Z0-9 ]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="password"){
        var vv=String(valor).replace(/[^a-zA-Z0-9·&-,$+*/%=?¿!._]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
        }
        if(this.state.type=="text"){
          var vv=String(valor).replace(/[^a-zA-Z]+/gi, '')
          
          valor=vv
          this.setState({ valor:vv });
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
          }else{
            valor=String(0)
            this.setState({ valor:String(0) });
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
  clear(){
      this.setState({valor:'',error:'',limite:this.props.limite?this.props.limite:11,ayuda:this.props.ayuda,ico:this.props.ico});
      this.refs.mInput.clear()
      
  }
  valorSel(){
      var value=null
      this.state.data.map((item)=>{
        if(item.label==this.state.valor){
            value=item.value
        }
      })
      return value;
  }
  valorSet(v){
    var value=null
      this.state.data.map((item)=>{
        if(item.value==v){
          this.setState({valor:item.label})
        }
      })
  }
  isFocused(){

  }
  focus(){
    this.focusIn()
  }
  focusIn(){
    
    this.RBSheet.open()
    //this.setState({valor:""})
  }
  valid(callback=function(){}){
      if(this.state.valor && this.state.valor!=undefined){
        this.setState({error:""})
          return true
      }else{
        this.RBSheet.open()
        this.setState({error:"Favor ingrese campo "+this.props.title})
          callback("Favor ingrese campo "+this.props.title)
          return false;
          
      }
  }
  openOpciones(){
    if(this.state.editable){
      this.RBSheet.open()
    }else{

    }
    
  }
  
    render() {
        return (<>
                   <TouchableOpacity onPress={()=>{this.openOpciones()}} style={{position:'relative',paddingTop:8}}>
                       <TextField 
                    ref={'mInput'}  
                    floatingPlaceholderStyle={styles.float} 
                    style={[styles.input,{borderColor:this.state.foco?"#03A9F4":"#03A9F4",backgroundColor:"#fff"}]} 
                    onChangeText={(e)=>{ this.validCatacterForm(e)}} 
                    transformer={(e)=>{
                      return this.validCatacterForm(e)
                     
                    }} 

                    disabledColor={'#000'}
                    editable={false}
                    value={this.state.valor}
                    returnKeyType={'done'} 
                    keyboardType={this.state.keytype}  
                    enableErrors={false} text80 
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={"#999"}

                    allowFontScaling={false}
                    label={this.state.title} 
                    labelStyle={styles.title}
                    labelProps={{allowFontScaling:false}}

                    floatingPlaceholder={false} 
                    hideUnderline={true}
                    autoCompleteType={'off'}
                    textContentType={'none'}
                    autoCorrect={false}
                    secureTextEntry={this.state.secureTextEntry}
                    //rightIconSource={require('../assets/drop-down.png')}
                    //rightIconStyle={{width:verticalScale(14),height:verticalScale(16),marginTop:verticalScale(10),marginRight:verticalScale(5)}}
                    maxLength={this.state.limite}
                    onSubmitEditing={()=>{
                      if(typeof this.props.callback === 'function'){
                        this.refs.mInput.blur()
                        this.props.callback('cambiar')
                      }
                      
                    }}
                  /><View style={{position:'absolute',top:0,width:'100%',height:70,zIndex:100,left:0}}></View>
                                                        

                  </TouchableOpacity>

                  <RBSheet
                ref={ref => {this.RBSheet = ref;}}
                height={52*6}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={false}
                customStyles={{
                  container: {
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:40,
                    paddingTop:0,
                    backgroundColor:'#fff',
                    borderTopLeftRadius:verticalScale(20),
                    borderTopRightRadius:verticalScale(20)
                  }
                }}
                onClose={()=>{this.props.callback();}}
              >
                <TouchableOpacity onPress={()=>{this.setState({valor:""});this.RBSheet.close();}} style={{ width: '100%', padding: 4,paddingTop:0, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} ><SimpleLineIcons name="arrow-down" color="#000" size={16} /></TouchableOpacity>

                <View style={[{width:'100%',flex:1}]}>
                <ScrollView style={[{flex:1,width:'100%'}]} contentContainerStyle={[{padding:10,}]}>
                {this.state.data.map((options,index) => {
                    
                    return this.state.valor==options.label?(<TouchableOpacity key={'a_'+index} onPress={()=>{this.setState({valor:options.label},()=>{this.valid(function(){})});this.RBSheet.close();}} style={{height:50,borderBottomWidth:0,borderBottomColor:'#f1f1f1',width:'100%',padding:12,paddingBottom:0,flexDirection:'row',backgroundColor:'#0d47a1',shadowOpacity:0,borderRadius:verticalScale(20)}}>
                       <Ionicons name="ios-radio-button-on" size={22} style={{color:'#fff'}} ></Ionicons>
                       <Text style={[styles.item,{color:"#fff"}]}>{options.label}</Text>
                    </TouchableOpacity>):(<TouchableOpacity key={'a_'+index}  onPress={()=>{this.setState({valor:options.label});this.RBSheet.close();}} style={{height:46,borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:'100%',padding:12,paddingBottom:0,flexDirection:'row',backgroundColor:'#fff',shadowOpacity:0}}>
                       <Ionicons name="ios-radio-button-off" size={22} style={{opacity:0.2,color:'#0d47a1'}} ></Ionicons>
                       <Text style={styles.item}>{options.label}</Text>
                    </TouchableOpacity>)
                
                })}
                </ScrollView>
                </View>
              </RBSheet>
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
  modal2: {
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * 8
  },
  ttl: {
    fontSize: '18@vs',
    padding: 20,
    paddingTop: 6,
    paddingBottom: 0,
    fontWeight: '300',
    textAlign: 'center',
    color: '#0d47a1'
  },
  item: {
    fontSize: '12@vs',
    padding: 4,
    paddingTop: 4,
    paddingLeft:10,
    paddingBottom: 0,
    fontWeight: '400',
    textAlign: 'center',
    color: '#0d47a1'
  },
  input:{
    margin:0,
    borderWidth:1,
    borderColor:'#ccc',
    color:"#000",
    padding:'13@vs',
    fontSize:'12@vs',
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
    paddingTop:10,
    paddingLeft:4
  },
});


