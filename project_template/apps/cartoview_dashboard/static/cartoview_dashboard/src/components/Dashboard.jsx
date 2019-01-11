// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css'

import DazzleDashboard, { addWidget } from 'react-dazzle'
import React, { Component, PropTypes } from 'react'

import AddWidgetDialog from './AddWidgetDialog.jsx'
import ConfigManager from '../managers/ConfigManager.jsx'
import Container from './Container.jsx'
import CustomFrame from './CustomFrame.jsx'
// import EditBar from './EditBar.jsx' 
// App components
import Header from './Header.jsx'
import Toolbar from './DashboardToolbar.jsx'
import WidgetConfigDialog from './WidgetConfigDialog.jsx'

// Our styles
//import '../styles/custom.css'
var widgetId = 0
class Dashboard extends Component {
    constructor( props ) {
        super( props )
        var { widgets,
            layout,
            editable,
            isNew, 
            isOwner,
            title,
            abstract } = props
        Object.keys( widgets ).map( ( id ) => {
            const ref = ( w ) => {
                if ( w ) {
                    this.widgets[ id ] = w
                    w.id = id
                }
            }
            const w = widgets[ id ]
            widgets[ id ] = {
                type: Dashboard.widgetsClasses[ w.type ],
                title: w.title,
                props: { config: w.config, id, ref }
            }
        } )
        this.state = {
            widgets,
            layout,
            editable,
            isOwner,
            isNew,
            saved: !isNew,
            title,
            abstract,
            addWidgetDialogOpen: false,
            addWidgetOptions: null,
        }
        this.configManager = new ConfigManager( this )
        this.widgets = {}
    }
    getChildContext( ) {
        return {
            configManager: this.configManager
        }
    }
    /**
     * When a widget is removed, the layout should be set again.
     */
    onRemove = ( layout ) => {
        this.setState( {
            layout: layout,
            saved: false,
        } )
    }
    /**
     * Adds new widgget.
     */
    onAdd = ( layout, rowIndex, columnIndex ) => {
        // Open the AddWidget dialog by seting the 'addWidgetDialogOpen' to true.
        // Also preserve the details such as the layout, rowIndex, and columnIndex  in 'addWidgetOptions'.
        //  This will be used later when user picks a widget to add.
        this.setState( {
            saved: false,
            addWidgetDialogOpen: true,
            addWidgetOptions: {
                layout,
                rowIndex,
                columnIndex,
            },
        } )
    }
    /**
     * When a widget moved, this will be called. Layout should be given back.
     */
    onMove = ( layout ) => {
        this.setState( {
            saved: false,
            layout: layout,
        } )
    }
    /**
     * This will be called when user tries to close the modal dialog.
     */
    onRequestClose = ( ) => {
        this.setState( {
            addWidgetDialogOpen: false,
        } )
    }
    showWidgetConfigDialog = ( id ) => {
        this.setState( {
            widgetConfigDialogOpen: true,
            configWidgetId: id
        } )
    }
    closeWidgetConfigDialog = ( id, config ) => {
        this.setState( {
            widgetConfigDialogOpen: false
        } )
    }
    updateWidget = ( widget, config ) => {
        const widgets = this.state.widgets
        if ( widget ) {
            widgets[ widget.id ].title = config.title
            widgets[ widget.id ].props.config = config.widgetConfig
        }
        this.setState( {saved: false, widgets, widgetConfigDialogOpen: false } )
    }
    onHeaderChanged = () => {
        this.setState({saved: false})
    }
    render( ) {
        let {
            addWidgetDialogOpen,
            widgets,
            widgetConfigDialogOpen,
            configWidgetId,
            editable,
            title,
            abstract,
            isNew,
            saved,
            isOwner,
            layout
        } = this.state
        return (
            <Container>
        <AddWidgetDialog widgets={widgets} isOpen={addWidgetDialogOpen} onRequestClose={this.onRequestClose} onWidgetSelect={this.handleWidgetSelection} />
        <WidgetConfigDialog isOpen={widgetConfigDialogOpen} widgetId={configWidgetId} />
        <Header editable={editable} title={title} abstract={abstract} ref="header" onChange={this.onHeaderChanged}/>
        <Toolbar isNew={isNew} editable={editable} saved={saved} isOwner={isOwner} />
        <DazzleDashboard
          frameComponent={CustomFrame}
          onRemove={this.onRemove}
          layout={layout}
          widgets={widgets}
          editable={editable}
          onAdd={this.onAdd}
          onMove={this.onMove}
          addWidgetComponentText="Add New Widget"
        />

      </Container>
        )
    }

    save =( ) => {
        this.setState({saved: true})
    }
    /**
     * Toggeles edit mode in dashboard.
     */
    toggleEdit = ( ) => {
        this.setState( {
            editable: !this.state.editable,
        } )
    }
    getNewId( ) {
        var newId = "w_" + ( widgetId++ )
        if ( this.state.widgets[ newId ] ) return this.getNewId( )
        return newId
    }
    /**
     * When user selects a widget from the modal dialog, this will be called.
     * By calling the 'addWidget' method, the widget could be added to the previous requested location.
     */
    handleWidgetSelection = ( widgetType ) => {
        var id = this.getNewId( )
        const ref = ( w ) => {
            if ( w ) {
                this.widgets[ id ] = w
                w.id = id
            }
        }
        this.state.widgets[ id ] = {
            title: widgetType.displayName || widgetType.name,
            type: widgetType,
            props: { id, ref, config: {}, isNew: true }
        }
        this.setState( {
            widgets: this.state.widgets
        } )
        const { layout, rowIndex, columnIndex } = this.state.addWidgetOptions
        /**
         * 'AddWidget' method gives you the new layout.
         */
        this.setState( {
            layout: addWidget( layout, rowIndex, columnIndex, id ),
            addWidgetDialogOpen: false,
        } , /*this.configManager.editWidgetConfig(id)*/)
        // Close the dialogbox
        // this.onRequestClose( )
    }
}
Dashboard.childContextTypes = {
    configManager: PropTypes.instanceOf( ConfigManager )
}
Dashboard.widgetsClasses = {}
Dashboard.registerWidget = function ( type ) {
    Dashboard.widgetsClasses[ type.name ] = type
}
export default Dashboard
