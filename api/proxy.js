import https from "https"; export default (req, res) => { res.setHeader("Access-Control-Allow-Origin","*"); res.status(200).json({ok:true,msg:"proxy working",query:req.query}); };
