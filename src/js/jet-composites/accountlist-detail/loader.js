/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./accountlist-detail-view.html', './accountlist-detail-viewModel', 'text!./component.json', 'css!./accountlist-detail-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('accountlist-detail', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);