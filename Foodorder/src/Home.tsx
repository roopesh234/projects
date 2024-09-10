import React from "react";
import { Typography, Card, CardMedia, Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Navigation } from "swiper/modules";

const images = [
  {
      src: 'https://t4.ftcdn.net/jpg/06/38/25/09/360_F_638250982_7oAiuL9tcsQJ7WL5AvNANwtaRQtsVBC2.jpg',
      title : 'Butter Naan'
  },
  {
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFhUXFxgXFhUYFRcWFxoYFxYXFhUXFRcdHSggGBolGxgXIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLSstNS0rMC0uLS0tLS0tLS0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABDEAACAQIEAwYDBgMFBgcAAAABAhEAAwQSITEFQVETImFxgZEGMqEUQlKxwfBi0eEjcoKishUkM4PS8QclRGOSs8L/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAApEQACAgEDAwMEAwEAAAAAAAAAAQIRAxIhMQQTQSJRYTKRofAUscGB/9oADAMBAAIRAxEAPwDxPTrU1q2eulK3a8APPenlxzf0FAYnECm3L2Ufl1NCm4g2BJ8ai7XWTrWNYr289ajy0SwzHaNIp62qIATIa6LZo1bNPFqsABFqnrboxlUUwMvjQ1IbSyNbddKUVaQNopE9NjTHtkEgiD0OnvWTszVA2Wui3U4t07JWbMkClKaVospUbJQsNA0VyKnNumFaJiEiuZamK1wrWAQxXIqUrTStYxGaUU+KaRRANpV2KUVgHKVKlWMKlSpVjHZrlKnBaxhtdBrtKawaDrIohUqrVz1PvRFnEsOfvrQs1FhkgE9ATQlhWcwOfOrrhQF7ubOdvwsfw+BPt5URw7DLaeCwVvuhhp/XyqWSVRtFYRt0wE/D5jViTpsNNfGrB/hQATcdbYiZJAJ57bk1Y2cLfntGlo1C8m9qiuYG9cc3LyOFnUjUjpAnauTvSfk6e0l4A8N8OB1DW8wHOTm9TG1c4tg8qoW+cSp8Y2/flWht4/DWTJdjA7o3M+Crt5ms9xTiZu3MzLl/CCNfM+gFHFObnvwLOMVH5K3saabB6H2NTm4zfKpI67D0oe4Lg3XXw1rr1kNDQw2zNca1UuHx5BhlDjmrT9DutWGKwS5Fu2yTbYlYPzI8SUbrpqDzHlR1AoqCtMKUUbVNyUbNQI1umZKKy03JRABslNIoh1qMrRAQ5a4RU18gMQNhoP51ERWQGMIpkVKRTGFEAw1ynVysY5SrtKsAQok2MxEbECPQaj86FqazdZdvasFBtrCqu5E9alRRoAsdCRrQCXxPP8/61Il4/jH79Km4sopIOsW1mCB1PX0qe2lr8Go2H73qtNzfUajr/IUrd0KQSZjkBH1P8qRwY6kjV8Bw6B5iB/emADqT051J8RKl0MWG5LA8xJ/XnQPCAxTMRCzKoOZ/Ex5npRjYd7rZFEsVZo8FBYx10FFLTuzN3sjJWcbcTRbjr5MwHsDTr3Err6PduMOYLt/OtNhf/DvGXjmFsWlkSbjZSAdZyAFvpyq8X/wxsjVsW0QCe4BBjmQW9qhk63poPeS/v+jLHka4Kjhy2iqPlyrupiAD/OavsRg2vKBYti4TrII0jw38NutBXuFYe2e52hUaAsFDeUDaieF3rZOkoZAOdlXSfxHQDfXlI61xd3U7juKrbKO8HRskqCJkr909CeWvKh3ukaEqZ58vXma1+K4Lg1JOIxBZte5h27Q/4rhAWfIUJfsYE2glgXO0DElrqghwdMpCtuOWnM9dOhZFW6Om2Ze5dQ6tB6ADVfWKs8WyWMEA2j3biOBzyIrjPHiWAHrTbGAEM1i6jvrmFxLttUHlkIYaHdgNNjQ+D4dfF44i6BegEkq6XcxiIIUkqAOUCq6lzZPS2wG7hrpg5MoIkF2A/wAoM0O/Db+UsSqnkuhJHM6THh1rQ8LsZyzMoGsKYIB1gkDkN9T9KdjmRWYSbjJ3dNNdNZ6e9L/IerSV7Hp1MxeJF1DDyvnFK1iW5ww9j6GtKYliAuUEFs8MQfCd9eVBX0tu2pzMAYgBTA2q6y3yiLw+zArtnuhhqrTHUEbg+P8AOhbi1ZX7oKhF2Ukn+8dIHkKEdasiIJiE75P4gCPWmEUb2eZCPvJ3h4r98fr70OVrJmaIYqNxRBWmOtEFEBFNIqUCmtRFGRSpRXaxiQKPw/nUyoNxVobII5T1J19udV+NZR3V3O/pSRlY8o0B3gJ0pk04WyausPwpLQD4mS3KwDDeBuN93+6NfKjKSjyKk29iu4fg7l0xbQsecbDxZjoo86vsDwO2c6u5uXMuYCyC8QyyAfvsRIgA0Rwgtirgw/8Aw7ZDZFRYtq4EqXA3BiCTrqNa2fwPw42EBuGGLdp2YIBBCFQHaRrGuXlO+sVwdV1fbT9/Y7cHTaiT4b+EmIIu2uzClMoLyzKO840gD7o1AjvdK0V/hqoCEXIf4AU3kqZUd86RlmNNaGxfHboAW3hb753C2yYW2dCWdm+ZEmdcoECddKGwoxyE2jetdn2rf2xdmuBIzZUVpnVgBMkSNIFeXJTy+rLNLylfgvFqDqKsphex/fUW3VSLStcNsqoyklWJE7zqRPPoauuHnKjYc2/kZWuXlllbPDBs2useOgA8Ku8NcCKvMQGEks0gEKzEqJbfynwFUHHPiNVsOVOsgCDHn+X5VzZMscr0Qh5W/wDpfszyL1OkUXxBi0U90ZttBpqeXODoR6VX8Wt2rmDziMysGJBJALL3gJ02CzB3HKaOwXF0ayWfse0MxmJ1M90tAOUROhHI9aixGI+0D7Pda2uXXSGzfhXSB4ydz5134ovFW3D3OeOCKTSd2UvwrjrAc2rzwNAjHUKeYYzttB8a9Dw/AMIy/aO3RSgzs2aU7upzmZA8dKyB+DS+Z89uE1le9BiIygTo4jWOvWqbiHDXQshl1BiRK5tjIXz/ACrr7mPJL0sj25xW6PR+N/GyXrBW2wZGEMwVlk6hlAIDL4HxNE4f4cw4tZ7duGYTaZmJacq6kOYHyjTWCzdNfL8DJa3A7itJHlsCPOt3w/4jlywB7MQBIEAmc5iI10mNJk1xZ4OH0X78/g6scdSVD+KoXclCSgtl+yMm4r23GYHMMwYKVYKd400rNX79gOwv2biXB3S+rrJ+/lMbz+L00q1+JcSTcW5qbMC29sFVZFgBiX123Bk/MdjuVa4hh37Sy2UKpIbUspnMmhnXfaaEcjxxTStfA+h5PT5MXi+C3LsvhsuJgfLbci6BHOwwzH/DmrM3muZzbYFG2ZSCrDwada9GxnwWLdoXrF64HSWLFYzk6qFCsTb2MfNOYVDwz4qw+IixxSyLijRcQO7ft/4hqR+4r0sHVRmrjul9zgy4ZRe5kbFiIVR4Ac5P611rBiYMTE+PTzrdfEfwBcsp9pwr/acORmDoO+o3lgPmH8Q9hWUx+PNxsmUKASxj7zNu3hz08a6td1pIJe5V2e6wboduo5j1EiocTYysVG26nqraqfb8qlu3gD1PQbeprjXs9smNbR1/uOYA9G/10b3sNbApWo2Wn9sOn1pyLmOnsdKa0LQIF3FMYUS9shoIg8wdNRUbrTC0DxSqXLSrAokSxcbdj7mirPD/ADP75UyzcI51oeHXuzsPimAkEpZ8WjvP6bDx8qSU6QyhYNdRcGIENiCNTuLU8l/9zqeWw5ks4Twa7iLgLK2T7zSAe8pZSJ35HTlUPB8DcxFyQMzfMZIgf3p9o516Vg8KyKqOyyIjLopA0QDmQBpr1rzur6rtLb6meh0vTd1/A3DoLdtbYiQgtlwAGJCqhYnUqYUc40FWFnC4e3Zgkqi/eLNn13JOhMzvHSOVR3HlAzkLBJ7g0E8hy8etZz4nfLlU3ZIJkBSIOup172k6Ej5a8nHGWWWlvyenPTCGyqi+4r8XpZYqpHyHSDz2IAOnkfcUzhvHRcLOofIszccLbUTBjLPeJ8dd5jSsHiTZuNoGLFSRJ3YRlWB1AI8yKe/GoS2gQBEERAAJO5BjSecV3roYaaS38nIs+72VGp4l8UOTlF1jIJUqGIggrrBOog6TvVPxrAXgFChnB77FTJzOIMAtI0E7cmMmYDrWGu4p7TdmiWlZj3csKCcxOUGeUCRuRVxjcCzXBdt3VCIczMpVGLbhFUAfdIAnkZJox0YmlGvkL1ZLvgxljhl/IHNlyjDR8pII9P37VLh7YcKAYZfmaYUKIkkeXTckRvRb8Tus/a3L5RNYytLEDTKsbDeDrtsaPsccw9ye1toZ0zNGeBoCSBM6k777RXTKU6tr7EIxj4f3J7XxF2TKUJyoRqxINw7MzeESI5AxRF4WmuNbZgqN8rga5D31MnqCDvpND457V0AW76qvyrZdQU+8AoAXQE5dSCx110ovhfAFdUfEXFXKEVUtktIWGAedDAMacorhyrHFam6f5LwU26SsHx/AirdpbIZP82Wem3+LbWq66GAADqCBmEGOszvOhrXYe5h7CsLTPqus5WgKNSqkaMYpXcImLQpntlEOYPBmTMrl5N8pJ8tthOHUeZce/AcmKUHXD9jHYe9iAk5REmAHWSQBHdmY1Gu21NwFnLiSWVnX5iDqSY7QqJEkEgClxW4+EuBQNGKtOUSQMrlPaJAPPxq84FeTvXTcXMQOydl1XQz3iPIc/mOxrrySUYaktmvBKClOVeUE8L43f7fK9p/7QHuZTngE5cmhnTmPA0/GcOs4oOjArdjKHjvhcwfKJnWZ317zaiaGwnxG6PcYW+1aBmdVJdlC5VEycqTBI0325V3gvFGvsbt0KqjTN8pY7kzsxiN9e741wzxTi+5Baarh/wCFk4v0T3s58LcQxPDmPZXe3sZoeywZCOsA6BtJ0PpVl8Y/DlnGYdsfw8ANB7W0BHi2VeT76c597G7xK26RIj+KCJBAYQdzr060zgVwWHOIs5gmov2icwMCcyAeA+op8PXSu5qv3/hLJ0irY8iwXBmujQMeoA29a0lj4W7PDkSM10gMDrCowYCepbL7VueNWreGvDKJsYgNdtZRoH3ur5HMHHm9U93EZ9rZEbZvXlzrsydTNulsi/S9HilDW9zGYr4ZVZBzZhyWDHnVWeEldSyx561r7gYKziO/KzIEdT4VTSCRB23gfuavDLJ+RMvTY/Yr7ljOhn5rallbmVAlkPURJHQjxqpdau8fiAgIBaSpUT/F3f1qouCurE3W55eeKUqQNFKn1yqkKLe5gmAyrYjoZ1O3OdavPivh8fZcKCFXLudt9fMk+5qs4RnbEWQdjcWdQef/AGr0D4twIN7C3GAIy3FMzGYZSs9Y1MeFcGXI4NX8s7YRUtkQcEwa4dJAEABSxVfuyBqNSd6A47xvKZDySdAFgCNZkiT6ijMSgzZIAVt8khQvLWInbQHlWc4pw62Y/wCIAOQYEQTvmPpXnYoRnPVPyeg5OEfQhqcXd5VBOksZHy85J2/PWqnitxn1UkhRLnxOutWAuqEyJJBaGcKoJj5V7oAJMgc9TvUuB4YS4UKB3RmHgYPe9OfnXdFRg7SOecpSVNlJg8EWAcFhG7cgQeR3P86KuYAvLd7LPzRpJ20HX9asrjq7izaVjbT8A1PIsOnPU8pPWtl8N4a3ZTNPfacivl0ySWiCRuB3uRBodR1PbVk8WJz2RnF4Li7eGDMItMgIkDMJy5Qo0aTtrpVbiL1+xdIOjoJykg5c43AmNv3pW4v8euLlZ8gAjM2cMACSoIgEwYOsbHcVnfiNMNcLFbf9o5LM6MzzIGokxHQbR6Vy4c7lL1xq/wDp1ZMUoRrUYTEXyeeg+n9aVpARM6jXTfyFTJwy6xgW3PiFOUaxJYCBvz2q3w/AFzWW0y3XZcmfQZGCHviSd5ET6160skYrk8xQk2U6O0bwNNjznr1q54dxa7aYE5XUjQOMwGka7bU3jXw69nVbispYrGxkd4KYkSR5fpVWL5BgiNPr1mkejLHbdFoueN+xs+KY5sXZXIgRc/eCSGkIxHe0AB0EfxeFVWBVlZTLRIOhMaayRGp2OnWq+zxK5bXNbbu5lLa75DmAHqdan+122JyOUYzlUgZZjujNMgctokDWoQw6YuCWwcmW5KTZpLePZgUZjsZZRrlnWAYMRExQXFeFQR2d0MsArmEHvTBBBggxHKg7GJiCRBGzTo0iCCQY1E6ij+H8QBGW8kqSzCTuZ1yjmesee9cyg8b9K2OqMtcb8lvYdltW1MK2Rcx7qZUYBUOgBDvCyNSADrrVRib9lbRw1tipIzM4OpbYAGdgI0PIdaD49mvO7K4LFtwY5QuUHXePKqSze+zHNchnAhFmcszqwP8Ap8arjwalq880DLkUXS+5Phrl4TZEzsCuo1M90+Jrf8NVEtjvMIVQwYiCcsOCu+/6V57hPim6rB4Gm3Poee0eHStkvG0xH/EALEHvA5dxozR46z4VHr4TaVx2+DdPKPh2XXxRf/8AKjcX5sLeRl0gRIJA6CGIrz/EfG73NHQjqVgnnyMVrfi7E27XCryowYX7ygEEESApeCAJia8ivuZ6V19HhjPEnJHNl6meKbUHRpLnxDaIgpcaJyg5QNdye9vQFzjhiESOck6z6VSlqJwZUaneuxYYo55dXkl5Cu8QzMSWOv6gV1ztS7UVEr6VQjZ2KVMz1ygEk4Xjil23dZmbI6tE/hYH8pr37j3DvtGEIt6sALtojmQJAHmpI9a+fuCKe2Q/hYNrtIIIB8JivcMH8SW8Oexc5Uab2FY7G27EvZnk1q5mSPwhelcXWRtquUX6aVcmQxRuNYGYqsBQcvemSe84gQRrzMa7RXeCcGVpN24crKQkZSJWMxZSdYHLSa03HsCl9GxWEYkCWvWVGbXm4SdVOsga8+tZ0cSW0gtpbGZvmIEiW7xC6QIEbdBrtXC3JRqHLO+MlLnwaGx9nsqEWAQoUPEuY2Ma/fYnrqTXeKYe06NlORrilS0kySDDGfHTYaelZkcVFtcyPc11+f1Og9uf6ALE8fu5g2YzsCSfMEjaoLp8uq02V146pou7eFSxbIRo0JJyHWAVl3J3MnYeA01p2PxYRQ7kBjbyIkQFBAzSnI6HTlO+ulbhOI3L6vFlC8ElggzSkSx031330qr4plntLhZkjKjQe8ygZiFZe8oJg+e+hjohhlOfqe4JdRHHD0nEJDGHBYGCsRtv118PCrjCcQs63riK+nyHUC4DJMDcHX38Kz68RTObgHaMBCq40J2XMoJzECBroYHTXVcF4hfxSEPbsrZk5i1tILTsEAl3PgBy1quaDit+Psc8cutgj/GKsoS3btIs6gAGQABBEQZgSedOscdQhEa2mmqyCBI1JBGxmD6e0fHuB2wRnRUkSDayrHIBwBAOvIRpvvQGJw9i2AyrdvqCNYOQAaEFjux6CIJpI4sUl6b/AH5KOWSKtpUXvZ3MQSbaliSCYfMAQCVbNMLoSNY38qzfFcAzOJQgrKFYY5oJCnqefoByq6PxWBbFu0gtoPuIIA21J6zOu5nWrjhvHBcsvOSQJAZSSzzBzTsRC+UVPXkwu9O3Azqcasx3DcDIOZTA0A2BMjmR3f351WcV4ewJOgjQgDTyPOfOa1OI4mAMp7gBhkQAbD5o59KEvYpCBnOh2Xc+BAHy+Zrox5Z3qohkwxqrMnhFZN1MHTTSJO/n51eXXLWQwdJV9LefvyzEEFYkg90z4UzEFWd4gDkx22CxQeEviw7kwynuzE6c4Hl+VdLetXW5zxXb44NFc4HdS2WzqGK5iuZc+c7IAG1MRJ84rF8Twly2w7VSCZgyDMGDr59aOvYtFAZbru5jNoVUCNd9WP00qyvY7QBraHxKI+h/vDr4/WhB5Mb9VO/ihpaci22/JlkbXbbXrt4VdYK6zQV+cmMo2YkwAPEnl5Uy7bUEsNjp5D+U1Kl0YQFyIxDAhBztg/fPS4RtzWeu1pNTRJNwCPjjH6WcIrZhYBDmZDXnOa6R1Abug9AKzmNWKjzEnMd/1qxFrOgbpofT+lWitKohJuTspqVT3rBFQxTkxyvThcqKu1g2P7SlTKVCjWW/BkAMnmQP371p/iLFq+FVG1hi1thvbuL3X/w3AAT4gHmazmFOVsukiJHPce21SYjElkOoynlznkfzqEo3NM6E6hQzg3xFiMNcD23KsPHQ+BHMVtMJxvCYyZW1h8UxDd8E4Z3H3oB/s2PXUa7V5pcFNVqM8MZCQyyibDjOExNq7lv22V21SMuUgc7bDusPKq51cBTJh5gDfQwadwb4tv2V7KVu2TvYuqHtn/CdvMRVwvEcFiAAGfCXIiCO0w59fnTz71RcXHwXWTVyy84dxkWbduxM5R3mEDSZ5Hcnx1gVS/EeL7Y65iMxy5gCwG5g8hMaCnHgd9bQNlVxG5a5YcXQOQGUd/YDdRuaBvjs0Gb5mUTmGV0ZScwjdQdPP0rkjhUZ61ydLy6o6QCzaykHLIO2bYdZq4w3GbpRUB7oOhJPyjkB+tUuEx0sQfliMvXxHjVnhGyW2eTuUHkVJn3irZY39SJ4ml9Jc4fipY5HhkO63AG1OxEbaHfeouI4xd7dtk1acrPET0n5gQOmlUnbiWYGWMHwiADEb1zD8TKu3fYbxIka8o5VFYK3RbvFkt0liMx5RJnTzptrE9oe4FVlmZGUksIJ208/GpMK2a0XJALkAH+FDqQI1JMD0pNZU6hZOwLNqR+HoNKGyux3kk1Vg2Ie4xygLAiWPKJkeVQWLYzgOBG+ZT/8fPp6VYpcUmMpB6nqTGonyFQYogAHZpM9YBgH3p4y8UTaXLB2w6hzkOYcgTBnQyJ00NCcQwWYTLDuyBEakka/lUvEb6ds+uoO2uvdFCnht64VZZVR952KgeRP6TXRjvZtnPkoCXhrhc7KQkTpDGOWg29YozDBrgItbRLKT3V8SxPdHnRT3LSNJY3H/DbJVJ21PzN9KF4jibrCHi2m4QQo84G58TrVbcuSX08DXxq2R3D2lz8cd1P7g5t/EfQDeqe45JJJknUk/mfGnXGHL351FFWjFIhJtnVNXnANQQRKl1VuozBoI9QvoT4VRsK2Pw7gv90Zo1Z8y/8ALK5fqprS4GgiuxmB1qqvYStZjsg7xIA6nTxFZ/E463JiTrvED60E2GUUVL2YpnZ0Y2JU8j9KapU8/fSnsTSBUqn+znpSrWLpYXZwrqC3QH2qDtNPT9RWzFtRuB7Vl+MYDsmkfI2qnp1U/valTso1RXO1NilSphTkU8E10LXQKAaJLGKZDKllPUGD7jWrq38W4ogK9wXlH3byJdEdO8CR6GqI1yPClcU+UMm0aBeL4Y6vgbc9bV27a/ykso9qJbG4J1y/71aEzp2V0TEdENZT3p63P4jSvGmFZGjS4fD4QHTFuBrIfDHnvqtw0v8AZmHk5cbbjkDauj9KorV8/iU+Y/nWg4dxYgR2GCfxZQD/AKqlNSW6KQaYTes2mUKMVaACgDuvy3+7zJ/KuILSqV+1IRIOltp02qyw/F25YTh/sp//AHRycbvDa3w9PK3bJ/8AsrlbfDX5OhL5M+b9ome0uOf4bUTy5muvba4e7hb9zzDKNfIVd3/iLEj/ANTZXwtWVB9wjfnVPi+IXH+a9ffwlgPoR+VGL/f2jM6cFiF1Iw+HHV3XN+pJoLFJa3uXrl9uijIvoTqR5Cmm224ta/iYmfpE+tCX7R+8yjwED6Cqx38kpL4G3+JlRltKtseAlvc/0qquSTJJ8zvRlwgbCfE1DirPr6aDwroikiEtwRj0rgp7LH79KYxFVEHKCxCgSSYHroB716Niby4XDgb5AFA5kxH561l/hPh0v2zbL8g6t+LyH5+VWvxdLWARsHBPkQQPqanJ20ikVSbMnisW91pYydgNgB0A5CozYbmKN4dhcxHXymru5gFSJOvQ0JZFF0Wx9PKaszL2CRoNfCpP9msB3iB4bmr5hHyiByAEfWhnbef1/Zpe63wN/GiuWU32NqVWHa+FKjrkL2oGgtJrJrmK7JgUcrB3BYehHSsucTcQOhJ13k6jr71DZYzHXSnZy6ifiPCWt95e9bOzDl5/z2oDLWrwEpaykEEk6H2P78aqMbh1kwI8tvamT2NQAqx9PrpXKcVIpkVgkiRz/cU7KP3+/wBxTLbx+VPcgx4SPSRH60AiFqdtf341MuDPQe35xXbF2JJOoED1In6Udh8QwGp3G3gZ367fWkbYyige1gwN0B9YozDmwPmsz/zD/wBNRgnNEwsTJ1IG0eJmfaaLw1xZgAaBiS38Os7dOX5bUkt0PHYMwuIscsKD1m63/TVmnEbKifslvTq7N76CqA4g5C6aBTqpG4mMy9CDoQNPrRGHvd3O/eJ+W3OkbZm6+A8J6Vzywxe7/tl45Hwi0b4kOWbeEsKv4jbn2qH/AGniX3IQHbKqp/pGb1jlQIu6gh2CEgHvGVI5eWvtSu4nMxKmCp7pGwUTMePyn0NBY4rhDa35Y3iF5phmaRuGJY69CeXlVbiLQ2Mlj7+QqfEXc6Es0lT3TzM6n328/WobuJWcxj9dNiD9avFURk7BGTURpqJXkRI1HSmXHifH86bfxBJJ6mZiP6D0oK4/jV0myDaQ64/SmWVBOu1RM1dRqokSbNZwzGAAD0ir+4Ue3lbUMII8KwWFuwRWgwuO05mpyjuUjPYiwT27F0272kfKw2Ycj4TVncbtSIC5d9CSY6k1T8euLcUToRsf0PhWetX2X5WI8jFJLDq3OmHVuC0tbGnxWUkkbDQAa/vaoSRu23IfzqjPEbn4ppjYtz979Kywsz6qN3ReZk6fv2pVQ9ofxn60qbs/In8r4NRxbAgg/Q/lNZtiVJBGo5VrvtQJIqPE8KV+8BOhHoeX72op1yczRW4fHhlA6ACPKocQ80nwL25lWAH3spj32pqxOuo/pTBA3bWoy1ImmE01As7mFdVh1/frULGm5q1A1BYPiPUVIt48o96Bz07P1oaQ6yyt4poiD1/f19679oaZg7RtyNVpu0u2oaBtZd28a3dgNKggeRNPW88DuHTTdQIGgG/QD2qkF/8A7z+lI3/3P86V4xlkLlrz8somJlhGm200xrs7vbHkGY/kKqO2prXTWWMzyFhcuqNJcx5KPrrQzYkD5VA+p+tClzTadRRNzbJbl4mo6VOOlMKNipVsnnpTrUAeNSW7bOY0HiaWw0NQAcz7f1qzweLSIzQfHT6063wqzl711yxEjKAAPfegb3DWUE5h4DWSOU9D4UutPaxqaJOJqaqyKsMDdE9ncMKef4Dyby6j9a5i8EVJBEEEgjy0NOK1ZX0qcyxTaIoqVKlWMaWywLb61rOCnYGCKwF+6fmFG4DijL8rEHwJFRaaKnrVvhttxJG9UeM+A7LE5WZZ2A2BncA+GkbVRYX4nvgR2h+hog/El07ufePyqTm0OohuK+BMODam4UVJ7SNXcbjyMzr0PhVPxH4JtkzYvED8LjN/mEflUjcSZtyaVziwtLnc+Q5k9BQjkm2ZwiY7jPDjYudmWDEAExynUA+MQfWq+jcdiHv3WuEasZhRPIAD2ArtrhN5trbeoy/nFdfjcgA0qszwVxqxRfCZP0oK6FXQHMeuw9K1o1ENKlSogFSpUqxhUqVORCTAEnpWMNroFHWsD+IjxAO395thU6ZRoi6x80c45Trv5UrkOoe4F2WUZjudh+/ShyamxdyWPSTUFFCsnS2SRHP9mrfhvDZcG4+VN2I301geNU+HvlTO/gdquV4wrQGGX0nfx/nU8mrwPDT5LW7gkY/2QAAiSzGPCd99tKBbBvdcloUAnmDsSCB18zUmGxCkELcVARJgqBI94PtUBxKJI7UR0XU+kTFQSkXekku8H7iklRmBgmBA6n01puLcOzNBEs0A7xOk+MfnUFnGC4wknIsZQfDnGwA00rj3e83n+gNXhFpbkm0+AS9YoJ7NWV9CdiRQqggQ3pTiMEy0qKzLSo2DSTXFkUC0g1YSOXv/AC8Kie1QQWRWsURzoy1jz4Gq25bIplBwTNqaNBb4l/CKlHExvlWesCs3nPWu5z1odtB1moHGDygULiOM/wAXoKoCaVFY0DWwnFY5n8BQlENaGWTvUFMvgVnKVKlRAKu0qUVjDrVvMQBzq2TDkISugA1adW5aRsNR0nxoPAGJPpz/AHtNWd2/nVF0VV8AuZvxEcv50kmUgga0sgGDoend3iB19utMxN0AEjfZfQAE/l6xUmJuquo3O7cyPCddetAQXMn08BQjvuNJ1sgcCpFtUUloAVIqaU9iaQVrcCh6sLi0FdSKyA0MmlNcpURSS3cIotb1AVIrVgosleuOaHtNTy1Kx0cyDwpU3NXaBiVTTgKhBp4uwNaJjlxdNqgNmf1qdb8gAAjeT68qlUDbT8qwOQE2KdZw2YxMfvrRmUDcgVyAa1m0kGI4cyCdD5a1FbtdQaMuYghSuuugqHTePpR3FE2HkRNBEUQ15joKXY1kYGilFT9lXMlE1EQFOAp4WugVrMh1okcp/e9J8YfugL9fzp06UO9AL24Gs5JkmTUlt6hp6miBBwU5Zn9alt0HaYjbTlRVukKITiortupnFcfeiYrriRTKLupNDMkUxNobXVrldFYARbNSMagtmpWNKx0MmlSzUqwSVahxPKlSoivgLw+w9K6N/WlSoBQx9x++ZqRNh5V2lQQWcb9aYaVKmQrGCnGlSrAGUxq7SrBGV0UqVYx07VA1KlWCxlOSu0qIqJ7dE26VKlY6HGmXKVKggkbVDcpUqIrIK5SpUwhOKeKVKgxkNpUqVAJ//9k=',
      title : 'Biryani'
  },
  {
      src: 'https://wallpapercave.com/wp/wp6605653.jpg',
      title : 'Bevarages'
  },
  {
      src: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      title : 'Pizza'
  },
  {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIa9y6lyQHE04PXWVXIEKQLUTT2gvnR4-UQ&s',
      title : 'Burger'
  },
  {
      src: 'https://t3.ftcdn.net/jpg/08/28/40/64/360_F_828406425_I4yvWgyUeN0VTMO81cn80Qcb80NrFYed.jpg',
      title : 'Starters'
  },
  {
      src: 'https://t4.ftcdn.net/jpg/06/12/03/85/360_F_612038524_JSdZDp3QCWCntBgWTFuli5XtV0JIxZza.jpg',
      title : 'Tandoori'
  },
  {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRVRQS7i4N0OXh2kMjFeAvLC94NnIWoxPFA&s',
      title : 'Ice Creams'
  },
  {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc0pRIE6dZUZv-JFE_HR6OhyA8LHLgFiSL8A&s',
      title : 'Desserts'
  },
]

const Home: React.FC = () => {
  return (
    <div>
      <Box align='center' sx={{
            padding:2,
            boxShadow:4,
            backgroundColor:'orange',
            fontFamily:'sans-serif'
        }}>
            <Typography align="center" variant="h4" fontSize={30}
            sx={{
                backgroundColor:'black',
                width:500,
                padding:3,
                color: 'white',
            }}>
               <b> What would YOU like to have? </b>
            </Typography>
            <br/>
        <Swiper
        effect={'coverflow'}
        spaceBetween={50}
        grabCursor={true}
        centeredSlides={true}
        loop = {true}
        slidesPerView={4}
        coverflowEffect={
            {
                rotate:10,
                stretch:10,
                depth:50,
                modifier:2.5,
            }
        }
        pagination={{el:'swiper-pagination',clickable:true}}
        navigation={{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Navigation]}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Card sx={{
                        boxShadow:5,
                        borderRadius:2,
                        position:'relative',
                        width:300,
                        height:200
                     }}>
                        <CardMedia
                        sx={{ height: 200 ,
                            component:'img',
                            boxShadow:5,
                            borderRadius:2,
                            border:5
                        }}
                        image={image.src}
                        title={image.title}
                        />
                        <Box sx={{
                            position:'absolute',
                            bottom:8,
                            left:8,
                            color:'white',
                            backgroundColor:'rgba(0, 0, 0, 0.5)',
                            padding:'4px 8px',
                            borderRadius:'4px'
                        }}>
                        
                        <Typography align="center" fontSize={20}>
                           <b>{image.title}</b>
                        </Typography>
                        </Box>
                    </Card>
                </SwiperSlide>                
            ))}
        </Swiper>
        </Box>
        <Box sx={{
            height:500,
            backgroundColor:'orange'
        }}>
            <Box alignContent="left" sx={{
                color:'orange',
                backgroundColor:'black',
                height:300,
                width:300,
                borderRadius:5,
                ml:5,
                padding:15,
            }}>
                <Typography fontSize={60}><b>TASTE LIKE EVER BEFORE</b></Typography>
            </Box>
            <Box alignContent="right" sx={{
                color:'black',
                height:30,
                width:300,
                backgroundColor:'black'
            }}>
            </Box>
        </Box>
        <Box component="footer" sx={{
            color:'white',
            height:200,
            backgroundColor:'black',
            padding:10
        }}>
            <Typography fontSize={40} align="left"><b>allFoodinOne.hub</b></Typography>
            <Typography fontSize={20} align="left">food hub.one</Typography>
            <hr/>
            <Typography fontSize={30} align="right"><b>Contact us</b></Typography>
            <Typography fontSize={20} align="right">+91 ***********</Typography>
            <Typography fontSize={30} align="right"><b>Write to us</b></Typography>
            <Typography fontSize={20} align="right">allfoodinone_hub@gmail.com</Typography>
        </Box>
        </div>
  );
};

export default Home;
