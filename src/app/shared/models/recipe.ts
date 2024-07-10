export interface Recipe {
    _id?:string,
    recipeName:string,
    descripition:string,
    categories?:{
        categoryName:string
    }[],
    time:number,
    level:number,
   
    layers:{
        descripitionOfLayer:string,
        ingredients:string
    }[],
    instructions:string,
    image:string,
    isPrivate:boolean,
    userRecipe:[{
        _id:string,
        UserName:string,
        email:string
    }]
}
