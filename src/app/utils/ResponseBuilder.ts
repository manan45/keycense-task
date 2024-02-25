export class ResponseBuilder {
    static async send(
        res,
        statusCode,
        message,
        data = {},
    ){

        let status = 'success';
        if(typeof statusCode !== 'number' && [400, 401, 404, 500].indexOf(statusCode) > -1 ){
          status = 'failure';
        }
        let response = {
            status: status,
            data : data,
            message: message
        };
        return res
            .status(statusCode)
            .json(response);
    };

}