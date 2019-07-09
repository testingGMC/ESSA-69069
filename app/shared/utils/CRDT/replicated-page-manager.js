import CRDTEditorManager from './crdt-editor-manager'
import { HubConnectionState } from '@aspnet/signalr'
class ReplicatedPageManager{
    constructor() {
        this.pages = {}
        this.sendCallback = null
        this.connectionStatus = HubConnectionState.Disconnected
    }
    setSendCallback(sendCallback){
        this.sendCallback = sendCallback
    }
    setConnectionStatus(connectionStatus) {
        this.connectionStatus = connectionStatus
    }
    getOrCreatePageEditorManager(pageId) {
        if(this.pages[pageId] === undefined || this.pages[pageId] === null)
          this.pages[pageId] = new CRDTEditorManager(this.sendCallback, pageId, 400, this)
        
        return this.pages[pageId]
    }

}
export default ReplicatedPageManager