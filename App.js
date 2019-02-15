import React, { Component } from 'react';
import { Container,Header,Thumbnail,Text,Icon,Button,Item,Input,Card,CardItem,Left,Right,Body } from 'native-base';
import { ScrollView,Image } from 'react-native'
import axios from 'axios';

class App extends Component{

  constructor(){
    super();
    this.state={food:[],menu:''};
  }

  klik(){
    var url =`https://developers.zomato.com/api/v2.1/search?q=${this.state.menu}`
    var config = {
      headers:{'user-key':'a37a3e961538dee06dedf5312f00f172'}
    };
    axios.get(url,config).then((getData)=>{
      console.log(getData.data);
      this.setState({
        food:getData.data.restaurants
      })
    })
  }
  
  componentDidMount(){
  }
  render() {
    const data=this.state.food.map((item,index)=>{
      var name1=item.restaurant.name;
      var city1 =item.restaurant.location.city;
      var address1 =item.restaurant.location.address;
      var price1=item.restaurant.average_cost_for_two;
      var price2=price1/2
      var imgno = item.restaurant.thumb;
      if (imgno==''){
        imgno='https://www.newsline360.com/assets/site/img/icon-noimage.png'
      }
      return( <Card avatar key={index}>
      <CardItem header  style = {{ backgroundColor:'pink'}}>
        <Left>
          <Thumbnail source={{uri:imgno}}/>
          <Body>
            <Text style = {{ color:'white'}}>{name1}</Text>
            <Text note style = {{ color:'white'}}>{city1}</Text>
          </Body>
        </Left>
        <Right>
          <Text style = {{ color:'white'}}>Rp {price2}</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri:imgno}} style={{height:400,width:400,flex:1}}/>
      </CardItem>
      <CardItem footer  style = {{ backgroundColor:'pink'}}>
        <Left><Button transparent>
          <Icon name="flag"/>
          </Button>
          <Text style = {{ color:'white'}}>{address1}</Text>
        </Left>
      </CardItem>
      </Card>
      )
    })
    return (
     <Container>
       <Header searchBar rounded style = {{ backgroundColor:'pink'}} >
        <Item>
        <Button transparent onPress={()=>this.klik()}><Icon name="search"/></Button>
          <Input placeholder="Cari Menu Makanan..." onChangeText={(x)=>{this.setState({menu:x})}} />
        </Item>
       </Header>
       <ScrollView>
         {data}
       </ScrollView>
     </Container>
    );
  }
}

export default App;