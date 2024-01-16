/* This component NOT used anymore inside this project. 
However, it is transformed into a more generic code and is saved inside posts directory
to make it reusable  */

// import mainstyles from "./styles/mainstyles.module.css";
// import * as React from 'react';
// import { Stack, CardMedia, Button, Menu, MenuItem } from '@mui/material';

// export default function Post() {
//     return (
//         <Stack direction="row" spacing={3} >

//             <Stack direction="column" spacing={3}  style={{width:'inherit'}}>
//                 <PostInfo />

//                 <ProductPost classification="gold"/>
//                 <ProductPost classification="silver"/>
//                 <ProductPost classification="bronze"/>
//                 <ProductPost classification="others"/>
//                 <ProductPost classification="others"/>
//             </ Stack>
//         </Stack>
//     );
// }

// function Product() {
//     return (
//         <Stack direction="row" className={mainstyles.product}  style={{width: 955}}>
//                 {imgcontainer}
//             <Stack direction="column" className={mainstyles.inside}>
//                 <Stack direction="row">
//                     {productexpl}
//                     <PositionedMenu />
//                 </Stack>
//                 <Stack direction="row" className={mainstyles.prodbtns}>
//                     <Stack direction="row" height={50} width={600} justifyContent={"space-evenly"}>
//                         <LikeCounterBtn />
//                         <CommentCounter />
//                         {sharebtn}
//                         {savebtn}
//                     </Stack>
//                     <SellerCounter />
//                 </Stack>
//             </Stack>
//         </Stack>
//     );
// }

// const imgcontainer = (<CardMedia
//         component='img'
//         image= {require('./images/RectangleNoProd.png')}
//         sx={{color:'#7B7B7B', width:'223px', height:'210px', borderRadius: '18px 0px 0px 18px'}}>
//         </CardMedia>);

// function LikeCounterBtn(){
//     const[likeCount, setLikeCount] = React.useState(0);
//     const increment = () => {
//         setLikeCount( likeCount + 1);
//     }
//     const decrement = () => {
//         setLikeCount(likeCount - 1);
//     }
//     return (
//         <Stack component='' direction="row" className={mainstyles.countbtn}>
//             <img className={mainstyles.decr} src={require('./images/decrementbtn.png')} onClick={decrement} alt="" />
//             <p id={mainstyles.countdisplay}>{likeCount}</p>
//             <img className={mainstyles.incr} src={require('./images/incrementbtn.png')} onClick={increment} alt="" />

//         </Stack>
//     );
// }

// function CommentCounter(){
//     const[commentCount, setCommentCount] = React.useState(0);
//     const increment = () => {
//         setCommentCount( commentCount + 1);
//     }
//     const decrement = () => {
//         setCommentCount(commentCount - 1);
//     }
//     return (
//         <Stack direction="row" spacing={1}>
//             {commbtn}
//             <p className={mainstyles.commentCountDisp}>{commentCount}</p>
//         </Stack>
//     );
// }

// const commbtn = (<svg className={mainstyles.commbtn} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
//     <path d="M1.06055 18.8349V3.08986C1.06055 1.95238 1.98266 1.03027 3.12014 1.03027H17.5373C18.6748 1.03027 19.5969 1.95238 19.5969 3.08986V13.3878C19.5969 14.5253 18.6748 15.4474 17.5373 15.4474H6.16962C5.54395 15.4474 4.9522 15.7318 4.56135 16.2204L2.1609 19.2209C1.79604 19.677 1.06055 19.419 1.06055 18.8349Z" stroke="#353535" stroke-width="1.59718" />
// </svg>);

// const sharebtn = (<svg className={mainstyles.sharebtn} xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
//     <path d="M17.0042 11.001V17.0025C17.0042 18.1074 16.1086 19.0031 15.0037 19.0031H3.00052C1.89566 19.0031 1 18.1074 1 17.0025V11.001" stroke="#353535" stroke-width="1.55138" stroke-linecap="round" stroke-linejoin="round" />
//     <path d="M9.00092 13.0031V1M9.00092 1L5.5 4.50091M9.00092 1L12.5018 4.50091" stroke="#353535" stroke-width="1.55138" stroke-linecap="round" stroke-linejoin="round" />
// </svg>);

// const savebtn = (<svg className={mainstyles.savebtn} xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
//     <path d="M1.56449 15.6453L7.30096 13.3503L13.0374 15.6453V1.48063H1.56449V15.6453ZM1.09514 17.4467C0.834395 17.5619 0.586684 17.5454 0.352011 17.3974C0.117337 17.2493 0 17.0437 0 16.7805V1.48063C0 1.08579 0.156449 0.740314 0.469347 0.444188C0.782246 0.148063 1.14729 0 1.56449 0H13.0374C13.4546 0 13.8197 0.148063 14.1326 0.444188C14.4455 0.740314 14.6019 1.08579 14.6019 1.48063V16.7805C14.6019 17.0437 14.4846 17.2493 14.2499 17.3974C14.0152 17.5454 13.7675 17.5619 13.5068 17.4467L7.30096 14.9297L1.09514 17.4467Z" fill="#353535" />
// </svg>);

// function SellerCounter(){
//     const [numSeller, setNumSeller] = React.useState(0);
//     return (
//         <Stack direction='column' className={mainstyles.buybtn}>
//             <p>BUY</p>
//             <Stack direction="row"  className={mainstyles.numSeller}>
//                 <h3>{numSeller}</h3>
//                 <p>Seller</p>
//             </Stack>
//         </Stack>
//     );
// }

// const productexpl = (<p className={mainstyles.prodexpl}>Lorem ipsum dolor sit amet, consectetur tristique.Lorem ipsum dolor sit amet, consectetur tristique.</p>);
// const expbtn = (<svg className={mainstyles.expbtn} xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
//     <circle cx="16.1666" cy="16.4998" r="15.8333" fill="white" />
//     <path d="M4.82734 18.8335C4.27572 18.8335 3.80547 18.6371 3.41659 18.2442C3.0277 17.8514 2.83325 17.3792 2.83325 16.8276C2.83325 16.276 3.02967 15.8057 3.4225 15.4168C3.81531 15.0279 4.28753 14.8335 4.83917 14.8335C5.39078 14.8335 5.86103 15.0299 6.24992 15.4227C6.63881 15.8156 6.83325 16.2878 6.83325 16.8394C6.83325 17.391 6.63684 17.8613 6.244 18.2502C5.8512 18.6391 5.37897 18.8335 4.82734 18.8335ZM16.1607 18.8335C15.6091 18.8335 15.1388 18.6371 14.7499 18.2442C14.361 17.8514 14.1666 17.3792 14.1666 16.8276C14.1666 16.276 14.363 15.8057 14.7558 15.4168C15.1486 15.0279 15.6209 14.8335 16.1725 14.8335C16.7241 14.8335 17.1944 15.0299 17.5833 15.4227C17.9721 15.8156 18.1666 16.2878 18.1666 16.8394C18.1666 17.391 17.9702 17.8613 17.5773 18.2502C17.1845 18.6391 16.7123 18.8335 16.1607 18.8335ZM27.494 18.8335C26.9424 18.8335 26.4721 18.6371 26.0833 18.2442C25.6944 17.8514 25.4999 17.3792 25.4999 16.8276C25.4999 16.276 25.6963 15.8057 26.0892 15.4168C26.482 15.0279 26.9542 14.8335 27.5058 14.8335C28.0574 14.8335 28.5277 15.0299 28.9166 15.4227C29.3055 15.8156 29.4999 16.2878 29.4999 16.8394C29.4999 17.391 29.3035 17.8613 28.9107 18.2502C28.5179 18.6391 28.0456 18.8335 27.494 18.8335Z" fill="black" />
// </svg>)

// function PostInfo() {
//     return (
//         <Stack direction="row" spacing={3}>

//             {personimg}

//             <Stack  direction="column" className={mainstyles.postinfo} style={{width:'inherit', height:'100%'}}>
//                 <header style={{ width: '90%', height:'auto'}} >{header}</header>
//                 <span id="dateofthepost" defaultValue={"May 18"}>{formattedDate}</span>
//                 <p style={{ width: '90%', height:'auto'}}>{body}</p>
//             </Stack>
//         </Stack>
//     );
// }

// const header = (
//         <h4 style={{ fontWeight: "bold" }}>Lorem ipsum dolor sit amet, consectetur tristique.Lorem ipsum dolor sit amet, consectetur tristique.</h4>
//         );
// const body = (<p>Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit amet, consectetur tristiqu Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit amet, consectetur tristiq</p>);

// const currentDate = new Date();

// const options = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// };

// const formattedDate = currentDate.toLocaleDateString(undefined, options);

// const user = (<p>@Lorem</p>);

// function PositionedMenu() {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <div>
//             <Button
//                 id="demo-positioned-button"
//                 aria-controls={open ? 'demo-positioned-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//                 onClick={handleClick}
//                 style={{ position: 'relative', right: '0px', top: '0px' , width:'0px'}}
//             >
//                 {expbtn}
//             </Button>
//             <Menu
//                 id="demo-positioned-menu"
//                 aria-labelledby="demo-positioned-button"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'left',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'left',
//                 }}
//             >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//                 <MenuItem onClick={handleClose}>Logout</MenuItem>
//             </Menu>
//         </div>
//     );
// }

// const personimg = (
// <svg xmlns="http://www.w3.org/2000/svg" width="51" height="52" viewBox="0 0 51 52" fill="none">
//   <path d="M25.1602 2C11.9053 2 1.16016 12.7452 1.16016 26C1.16016 39.2547 11.9053 50 25.1602 50C38.4149 50 49.1602 39.2547 49.1602 26C49.1602 12.7452 38.4149 2 25.1602 2Z" stroke="black" stroke-width="2.23242" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M6.60938 41.2301C6.60938 41.2301 11.959 34.4004 25.159 34.4004C38.359 34.4004 43.7088 41.2301 43.7088 41.2301" stroke="black" stroke-width="2.23242" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M25.1609 26.0006C29.1375 26.0006 32.3609 22.7771 32.3609 18.8006C32.3609 14.8241 29.1375 11.6006 25.1609 11.6006C21.1844 11.6006 17.9609 14.8241 17.9609 18.8006C17.9609 22.7771 21.1844 26.0006 25.1609 26.0006Z" stroke="black" stroke-width="2.23242" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
// );

// const goldicon = (
//     <svg width="34" height="43" viewBox="0 0 34 43" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="16.8978" cy="22.0755" r="16.8978" fill="#FFE366" />
//         <path d="M8.86464 14.6876H22.0585L22.5623 17.1344H16.9729V31H13.8303V17.1344H8.86464V14.6876Z" fill="white" />
//         <path d="M19.8294 14.6827C21.4131 14.6827 22.7009 15.0346 23.6928 15.7385C24.6846 16.4264 25.1805 17.5942 25.1805 19.2419C25.1805 19.8498 25.0365 20.4018 24.7486 20.8977C24.4766 21.3776 24.1167 21.7935 23.6688 22.1455C24.4046 22.5294 25.0045 23.0493 25.4685 23.7052C25.9484 24.3611 26.1884 25.193 26.1884 26.2008C26.1884 27.7045 25.6604 28.8804 24.6046 29.7282C23.5648 30.5761 22.173 31 20.4293 31H13.7344V14.6827H19.8294ZM19.3735 17.2743H16.8299V21.3296H19.1335C19.9974 21.3296 20.6693 21.1696 21.1492 20.8497C21.6451 20.5137 21.8931 19.9938 21.8931 19.2899C21.8931 18.5221 21.6691 17.9942 21.2212 17.7062C20.7733 17.4182 20.1574 17.2743 19.3735 17.2743ZM20.4053 23.8492H16.8299V28.4324H20.1893C21.0212 28.4324 21.6851 28.2405 22.181 27.8565C22.6929 27.4726 22.9489 26.9287 22.9489 26.2248C22.9489 25.4569 22.7169 24.873 22.253 24.4731C21.7891 24.0571 21.1732 23.8492 20.4053 23.8492Z" fill="white" />
//         <circle cx="16.8975" cy="22.0958" r="16.012" stroke="white" stroke-width="0.136273" stroke-dasharray="0.27 0.27" />
//         <path d="M19.4991 14.4995H21.9991L22.4991 14.9995C21.5002 14.9995 23 14.9995 18.4991 14.4995C13.9981 13.9996 19.4991 14.4995 19.4991 14.4995Z" fill="#FFE366" />
//     </svg>
// );
// const silvericon = (
//     <svg width="34" height="43" viewBox="0 0 34 43" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="16.8978" cy="22.0755" r="16.8978" fill="#B8B8B8" />
//         <path d="M8.86464 14.6876H22.0585L22.5623 17.1344H16.9729V31H13.8303V17.1344H8.86464V14.6876Z" fill="white" />
//         <path d="M19.8294 14.6827C21.4131 14.6827 22.7009 15.0346 23.6928 15.7385C24.6846 16.4264 25.1805 17.5942 25.1805 19.2419C25.1805 19.8498 25.0365 20.4018 24.7486 20.8977C24.4766 21.3776 24.1167 21.7935 23.6688 22.1455C24.4046 22.5294 25.0045 23.0493 25.4685 23.7052C25.9484 24.3611 26.1884 25.193 26.1884 26.2008C26.1884 27.7045 25.6604 28.8804 24.6046 29.7282C23.5648 30.5761 22.173 31 20.4293 31H13.7344V14.6827H19.8294ZM19.3735 17.2743H16.8299V21.3296H19.1335C19.9974 21.3296 20.6693 21.1696 21.1492 20.8497C21.6451 20.5137 21.8931 19.9938 21.8931 19.2899C21.8931 18.5221 21.6691 17.9942 21.2212 17.7062C20.7733 17.4182 20.1574 17.2743 19.3735 17.2743ZM20.4053 23.8492H16.8299V28.4324H20.1893C21.0212 28.4324 21.6851 28.2405 22.181 27.8565C22.6929 27.4726 22.9489 26.9287 22.9489 26.2248C22.9489 25.4569 22.7169 24.873 22.253 24.4731C21.7891 24.0571 21.1732 23.8492 20.4053 23.8492Z" fill="white" />
//         <circle cx="16.8975" cy="22.0958" r="16.012" stroke="white" stroke-width="0.136273" stroke-dasharray="0.27 0.27" />
//         <path d="M19.4991 14.4995H21.9991L22.4991 14.9995C21.5002 14.9995 23 14.9995 18.4991 14.4995C13.9981 13.9996 19.4991 14.4995 19.4991 14.4995Z" fill="#B8B8B8" />
//     </svg>
// );
// const bronzeicon = (
//     <svg width="34" height="43" viewBox="0 0 34 43" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="16.8978" cy="22.0755" r="16.8978" fill="#E59D3C" />
//         <path d="M8.86464 14.6876H22.0585L22.5623 17.1344H16.9729V31H13.8303V17.1344H8.86464V14.6876Z" fill="white" />
//         <path d="M19.8294 14.6827C21.4131 14.6827 22.7009 15.0346 23.6928 15.7385C24.6846 16.4264 25.1805 17.5942 25.1805 19.2419C25.1805 19.8498 25.0365 20.4018 24.7486 20.8977C24.4766 21.3776 24.1167 21.7935 23.6688 22.1455C24.4046 22.5294 25.0045 23.0493 25.4685 23.7052C25.9484 24.3611 26.1884 25.193 26.1884 26.2008C26.1884 27.7045 25.6604 28.8804 24.6046 29.7282C23.5648 30.5761 22.173 31 20.4293 31H13.7344V14.6827H19.8294ZM19.3735 17.2743H16.8299V21.3296H19.1335C19.9974 21.3296 20.6693 21.1696 21.1492 20.8497C21.6451 20.5137 21.8931 19.9938 21.8931 19.2899C21.8931 18.5221 21.6691 17.9942 21.2212 17.7062C20.7733 17.4182 20.1574 17.2743 19.3735 17.2743ZM20.4053 23.8492H16.8299V28.4324H20.1893C21.0212 28.4324 21.6851 28.2405 22.181 27.8565C22.6929 27.4726 22.9489 26.9287 22.9489 26.2248C22.9489 25.4569 22.7169 24.873 22.253 24.4731C21.7891 24.0571 21.1732 23.8492 20.4053 23.8492Z" fill="white" />
//         <circle cx="16.8975" cy="22.0958" r="16.012" stroke="white" stroke-width="0.136273" stroke-dasharray="0.27 0.27" />
//         <path d="M19.4991 14.4995H21.9991L22.4991 14.9995C21.5002 14.9995 23 14.9995 18.4991 14.4995C13.9981 13.9996 19.4991 14.4995 19.4991 14.4995Z" fill="#E59D3C" />
//     </svg>
// );

// const ProductPost = ({classification}) => {
//     return (
//       <Stack
//         direction="row"
//         spacing={0}
//         alignItems={"stretch"}>

//         <div
//           className={mainstyles.badgeWrapper}>
//           <BadgeCategory
//             userChoice= {classification}/>
//         </div>

//         <Stack
//           direction="row"
//           spacing={0}>

//           {imgcontainer}

//           <div className={ mainstyles.captionContainer}>
//             <Stack
//               direction="column"
//               spacing={0}>
//                   <Stack
//                     direction="row"
//                     spacing={0} >
//                       <h5> Lorem ipsum dolor sit amet, consectetur tristique.Lorem ipsum dolor sit amet, consectetur tristique.</h5>
//                       <PositionedMenu/>
//                   </Stack>

//                   <Stack
//                     direction="row"
//                     className={mainstyles.prodbtns}>
//                       <Stack
//                       direction="row"
//                       height={50}
//                       width={600}
//                       justifyContent={"space-evenly"} >
//                           <LikeCounterBtn />
//                           <CommentCounter />
//                           {sharebtn}
//                           {savebtn}
//                       </Stack>
//                       <SellerCounter />
//                   </Stack>
//             </Stack>
//             </div >
//           </Stack>
//       </Stack>

//     )
//   }

//   const BadgeCategory = ( {userChoice} ) => {
//     let choice;
//     const numPosts = 0;

//     if( userChoice === 'gold') {
//       choice = <img src={require("./images/classifBadges/7.png")} alt="gold" id={mainstyles.badge}/>
//     } else if ( userChoice === 'silver') {
//       choice = <img src={require("./images/classifBadges/8.png")} alt="silver" id={mainstyles.badge}/>
//     } else if ( userChoice === 'bronze') {
//       choice =  <img src={require("./images/classifBadges/9.png")} alt="bronze" id={mainstyles.badge}/>
//     } else {
//       choice = renderBadge (numPosts + 1);
//     }

//     return (
//       <div className={mainstyles}>
//         {choice}
//       </div>
//     );
//     }

//   const renderBadge = (classification) => {
//     return (
//       <div id={mainstyles.badge}>
//         <span className={mainstyles.number}>{classification}</span>
//       </div>
//     );
//   }
