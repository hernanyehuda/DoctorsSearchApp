import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { FaFilter, FaSort, FaUserMd, FaCreditCard } from 'react-icons/fa';
import type { FilterOptions } from '../types';
import { SortOption } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-3">
          <FaFilter className="text-primary me-2" size={20} />
          <h5 className="mb-0 text-primary">Filter & Sort</h5>
        </div>
        
        <Row className="g-4">
          <Col lg={4}>
            <div 
              className="filter-option p-3 rounded-3 h-100"
              style={{ 
                backgroundColor: filters.showActiveOnly ? '#e3f2fd' : '#f8f9fa',
                border: filters.showActiveOnly ? '2px solid #2196F3' : '2px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => onFilterChange({ ...filters, showActiveOnly: !filters.showActiveOnly })}
            >
              <div className="d-flex align-items-center">
                <FaUserMd 
                  className="me-3" 
                  size={24} 
                  style={{ color: filters.showActiveOnly ? '#2196F3' : '#6c757d' }}
                />
                <div className="flex-grow-1">
                  <Form.Check
                    type="switch"
                    id="active-switch"
                    label={
                      <div>
                        <strong>Active Doctors</strong>
                        <div className="small text-muted">Show only currently active doctors</div>
                      </div>
                    }
                    checked={filters.showActiveOnly}
                    onChange={(e) => onFilterChange({ ...filters, showActiveOnly: e.target.checked })}
                    onClick={(e) => e.stopPropagation()}
                    className="custom-switch"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div 
              className="filter-option p-3 rounded-3 h-100"
              style={{ 
                backgroundColor: filters.showPayingOnly ? '#e8f5e9' : '#f8f9fa',
                border: filters.showPayingOnly ? '2px solid #4CAF50' : '2px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => onFilterChange({ ...filters, showPayingOnly: !filters.showPayingOnly })}
            >
              <div className="d-flex align-items-center">
                <FaCreditCard 
                  className="me-3" 
                  size={24} 
                  style={{ color: filters.showPayingOnly ? '#4CAF50' : '#6c757d' }}
                />
                <div className="flex-grow-1">
                  <Form.Check
                    type="switch"
                    id="paying-switch"
                    label={
                      <div>
                        <strong>Premium Doctors</strong>
                        <div className="small text-muted">Show only paying doctors</div>
                      </div>
                    }
                    checked={filters.showPayingOnly}
                    onChange={(e) => onFilterChange({ ...filters, showPayingOnly: e.target.checked })}
                    onClick={(e) => e.stopPropagation()}
                    className="custom-switch"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div 
              className="p-3 rounded-3 h-100"
              style={{ 
                backgroundColor: '#fff3e0',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center mb-2">
                <FaSort className="me-2 text-warning" size={24} />
                <strong>Sort Results</strong>
              </div>
              <Form.Select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: Number(e.target.value) })}
                className="border-warning"
                style={{ 
                  backgroundColor: 'white',
                  borderWidth: '2px'
                }}
              >
                <option value={SortOption.RatingDesc}>⭐ Rating (High to Low)</option>
                <option value={SortOption.Default}>📋 Default Order</option>
              </Form.Select>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;