

let foundercontroller = {
        index : (req,res)=>{
            return res.json({msg: "hello lecturers"})
        },
        // store: (req,res)=>{
        //     return res.json({msg: "store lecturers"})
        // },
        // update: (req,res)=>{
        //     return res.json({msg: "update lecturers"})
        // },
        upload: (req,res)=>{
            console.log(req.file)
            try{return res.json({msg: "upload image"})}catch(e){
                return res.status(500).json({msg:"server error"})
            }
        }

}


module.exports = foundercontroller

