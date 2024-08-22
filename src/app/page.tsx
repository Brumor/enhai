'use client'
import React, { useState } from 'react';
import '@nectary/theme-base';

import { setAssetsRegistry } from '@nectary/assets/utils'
import { setNectaryRegistry } from '@nectary/components/utils'
import { App } from "../components/App";
// setNectaryRegistry(window.customElements)
// setAssetsRegistry(window.customElements)

const MyComponent = () => <div className="nectary-theme-base"><App /></div>

export default MyComponent;
