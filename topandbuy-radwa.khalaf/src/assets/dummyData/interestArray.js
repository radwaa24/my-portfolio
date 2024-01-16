import { shuffleArray } from "../../utilities";


const interestArray = [
  renderInterest('1', 'Laptops', 'laptop'),
  renderInterest('2', 'Audio Devices', 'audioDevice'),
  renderInterest('3', "Men's clothing", 'mensclothing'),
  renderInterest('4', 'Sports gear', 'sportsgear'),
  renderInterest('5', 'Makeup', 'makeup'),
  renderInterest('6', 'Smartphones', 'smartphones'),
  renderInterest('7', 'Smartwatches', 'smartwatches'),
  renderInterest('8', 'Tablet', 'tablet'),
  renderInterest('9', "Women's clothing", 'womensclothing'),
  renderInterest('10', 'Gaming', 'gaming'),
  renderInterest('11', 'Arts & Craft Supplies', 'artscraftsupplies'),
  renderInterest('12', 'Furniture', 'furniture'),
  renderInterest('13', 'Cameras', 'cameras'),
  renderInterest('14', "Kid's clothing", 'kidsclothing'),
  renderInterest('15', 'Shoes', 'shoes'),
  renderInterest('16', 'Skincare products', 'skincareproducts'),
  renderInterest('17', 'Pet toys', 'pettoys'),
  renderInterest('18', 'Office furniture', 'officefurniture'),
  renderInterest('19', 'Gardening', 'gardening'),
  renderInterest('20', 'Body care', 'bodycare'),
  renderInterest('21', 'Cooking ingredients', 'cookingingredients'),
  renderInterest('22', 'Kitchen', 'kitchen'),
  renderInterest('23', 'Board games', 'boardgames'),
  renderInterest('24', 'Pet foods', 'petfood'),
  renderInterest('25', 'Camping', 'camping'),
  renderInterest('26', 'Travel accessories', 'travelaccessories'),
  renderInterest('27', 'Sport', 'sport'),
  renderInterest('28', 'Car accessories', 'caraccessories'),
  renderInterest('29', 'Books', 'books'),
  renderInterest('30', 'Hand tools', 'handtools'),
  renderInterest('31', 'Drawing tools', 'drawingtools'),
  renderInterest('32', 'Tech Gadgets', 'techgadgets'),
 
];


function renderInterest(value, label, image) {
  return { value: value, label: label, image: renderIcon(image) };
}

function renderIcon(name) {
  return (
    <img
      src={require(`../../components/images/interestImg/${name}.png`)}
      alt="icon"
      style={{ width: 20 }}
    />
  );
}


export const shuffledInterestsArr = shuffleArray(interestArray);

/* 
To include:
Art
Fashion
Food
Travel
technology
Science
Business
Politics
Health
Fitness
Education
Home
Gardening
DIY
Books
Photography
Movies
TV
News

*/