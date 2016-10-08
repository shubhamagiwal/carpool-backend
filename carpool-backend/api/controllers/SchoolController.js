/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async=require("async");

module.exports = {
	find:function(req,res){

    function getAllSchoolData(callback){
			School.findAll().then(function(response){
				if(response.length>0){
					var data=response;
					return res.ok({data:data});
				}else{
					return res.badRequest({
							exception: "No Schools found in detroit region"
					});
				}
			});
		}

		async.waterfall([
			getAllSchoolData
		],function(err){
			if(err){
				return res.badRequest(err);
			}
		});
	}
};
