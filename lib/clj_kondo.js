const { spawn } = require( 'child_process' );

async function cljKondo() {
    return new Promise((resolve, reject) => {
        let result = {
            stdout: "",
            stderr: "",
            statusCode: null
        };
        const kondo = spawn('clj-kondo', [...arguments, '--config', '{:output {:format :json}}']);
        kondo.stdout.on('data', data => {
            result.stdout += data.toString();
        });
        kondo.stderr.on('data', data => {
            result.stderr += data.toString();
        });
        kondo.on('close', code => {
            result.exitCode = code;
            result.stdout = JSON.parse(result.stdout);
            resolve(result);
        });
    });
}

module.exports = cljKondo;
