
console.log('Start Execution at ' + getSystemTime());

function buildBoot(boot) {
    setTimeout(function(){
        console.log('Building boot ' + boot + ' at ' + getSystemTime() );
    }, 2000);

    console.log('Building boot ' + boot + ' at ' + getSystemTime() );
}

var bootBaseName = 'NanoBoot';

buildBoot(bootBaseName);
buildBoot('super' + bootBaseName);

console.log('End Execution at ' + getSystemTime());

function getSystemTime() {
    var date = new Date();
    return date.getSeconds() + ':' + date.getMilliseconds();
}

/*

     Start Execution
     Building boot NanoBoot
     Building boot superNanoBoot
     End Execution

     Start Execution at 57:888
     Building boot NanoBoot at 57:891
     Building boot superNanoBoot at 57:893
     End Execution at 57:893
     Building boot NanoBoot at 59:891
     Building boot superNanoBoot at 59:893

 */