import UserAdmis from '../models/formulaireCNSS';



const createformulaireCNSS = (req,res) => {

    const {
        username,
        email,
        score}
         = req.body;

         const newUserAdmis = new UserAdmis({
            username,
            email,
            score
        });
        newUserAdmis.save(async (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            return res.status(201).json({
                status:true,
                message: "User created successfully",
                user
            });
        });


}

export{createformulaireCNSS};