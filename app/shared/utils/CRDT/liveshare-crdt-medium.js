import {Mutex} from 'async-mutex';
import { HubConnectionState } from '@aspnet/signalr'
class LiveShareCRDTMedium { 
    constructor(senderCallback, syncInterval, pageId, replicationManager) {
        this.senderCallback = senderCallback
        this.syncInterval = syncInterval
        this.maxOperationsCount = 2000
        this.queue = []
        this.pageId = pageId
        this.replicationManager = replicationManager
        this.mutex = new Mutex()  
        let that = this
        setInterval(() =>{
            this.sendOperations(that)
        }, syncInterval)
   
    }
    send(op){
        let that = this
        this.mutex
            .acquire()
            .then(function(release) {
                that.queue.push(op)
                release()
            })
    }
    sendOperations(that) {
        that.mutex
        .acquire()
        .then(function(release) {
            if(that.queue.length > 0){
                if(that.replicationManager.connectionStatus === HubConnectionState.Connected)
                    that.senderCallback(that.queue.slice(0, that.maxOperationsCount), that.pageId, that)
            }
            release()
        })
    }


}

export default LiveShareCRDTMedium